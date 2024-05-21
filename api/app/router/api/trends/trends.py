import time
from textwrap import dedent

from mysql.connector.pooling import PooledMySQLConnection
from typing_extensions import TypedDict

from fastapi import APIRouter, Query, HTTPException, status, Depends

from app.database import get_db_connection, pool
from app.ml import get_book_score_model, get_book_title_word2vec_model
from app.preprocessing import text_to_vector, okt, remove_stopwords

router = APIRouter(prefix="/trends")


book_score_model = get_book_score_model()
bt_model = get_book_title_word2vec_model()


class BookWithScore(TypedDict):
    id: int
    title: str
    author_name: str
    publisher_name: str
    edition: int
    score: float


KeywordsWithScore = list[TypedDict("Keyword", {"keyword": str, "score": float})]


@router.get('/related_keywords', response_model=KeywordsWithScore)
def get_related_keywords(query: str = Query(None)):
    query = query.strip()
    if not query:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)

    try:
        keywords = [keyword for keyword, _ in bt_model.wv.most_similar(query, topn=10)]
        return [{"keyword": keyword, "score": __get_score(keyword)} for keyword in keywords]
    except KeyError:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)


@router.get('/related_books', response_model=list[BookWithScore])
def get_related_books(query: str = Query(None), conn: PooledMySQLConnection = Depends(get_db_connection)):
    query = query.strip()
    if not query:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)

    try:
        related_keywords = okt.morphs(remove_stopwords(query)) + [keyword for keyword, _ in
                                                                  bt_model.wv.most_similar(query, topn=10)]
        cursor = conn.cursor(buffered=True, dictionary=True)
        cursor.execute(
            "select id, title, author_name, publisher_name, edition from books where match(title) against (%s) limit 11",
            (' '.join(related_keywords),))
        related_books = cursor.fetchall()
        books_with_score = [{**book, "score": __get_score(book.get('title'))} for book in related_books if
                            book.get('title') != query]
        return books_with_score[:10]
    except KeyError:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)


@router.get('/books', response_model=list[BookWithScore])
def get_trend_books():
    books = __get_trend_books(100)
    books_with_score = [{**book, "predict_score": __get_score(book.get('title'))} for book in books]
    return sorted(books_with_score, key=lambda x: x['predict_score'], reverse=True)[:10]


@router.get('/keywords', response_model=KeywordsWithScore)
def get_trend_keywords():
    books = __get_trend_books(1000)
    uniq_keywords = set(okt.morphs(" ".join([book.get("title") for book in books])))
    keywords_with_score = [
        {"keyword": keyword, "score": __get_score(keyword)} for keyword in uniq_keywords]
    keywords_with_score = sorted(keywords_with_score, key=lambda x: x.get("score"), reverse=True)
    return keywords_with_score[:100]


@router.get("/books/{book_id}", response_model=list[TypedDict("_", {"date": str, "score": float})])
def get_book_trend(book_id: int, conn: PooledMySQLConnection = Depends(get_db_connection)):
    cursor = conn.cursor(buffered=True, dictionary=True)
    cursor.execute("select id, title, author_name, publisher_name, edition from books b where b.id = %s", (book_id,))
    book = cursor.fetchone()

    last_12_months = [f'{year}년 {month}월' for year, month in __get_last_12_months()]
    titles = [book.get("title")] + [book.get("title") + f' {month}' for month in last_12_months[1:]]
    scores = [__get_score(title) for title in titles]
    return [{"date": month, "score": score} for month, score in zip(last_12_months, scores)]


def __get_score(text: str):
    text_vec = text_to_vector(text, bt_model, bt_model.vector_size)
    return book_score_model.predict([text_vec])[0]


def __get_trend_books(topn: int):
    with pool.get_connection() as conn:
        cursor = conn.cursor(buffered=True, dictionary=True)
        cursor.execute(dedent("""\
            with t1 as (select b.id                                  as id,
                           b.title                               as title,
                           b.author_name                         as author_name,
                           b.publisher_name                      as publisher_name,
                           b.edition                             as edition,
                           bss.score                             as score,
                           bss.score * log(count(bss.score) + 1) as weighted_score,
                           ntile(100) over (order by bss.score)  as s_ntile
                    from books b
                             join books_in_bookstores bib on b.id = bib.book_id
                             join book_categories_of_books bcib on b.id = bcib.book_id
                             join book_categories bc on bcib.category_id = bc.id
                             join bookstores bs on bib.store_id = bs.id
                             join book_sales_scores bss on b.id = bss.book_id and bs.id = bss.store_id
                    where bs.alias = 'aladin'
                      and bc.name = '컴퓨터/모바일'
                    group by b.id)
            select id, title, author_name, publisher_name, edition, score, weighted_score
            from t1
            where s_ntile between 10 and 90
            order by t1.weighted_score desc
            limit %s
            """), (topn,))
        return cursor.fetchall()


def __get_last_12_months():
    now = time.localtime()
    return [time.localtime(time.mktime((now.tm_year, now.tm_mon - n, 1, 0, 0, 0, 0, 0, 0)))[:2] for n in range(12)]