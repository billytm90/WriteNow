import scrapy


class AladinBestSpider(scrapy.Spider):
    name = "aladin_best"
    allowed_domains = ["www.aladin.co.kr"]

    # 링크 연결
    def __init__(self, cid=None, year=None, month=None, week=None, *args, **kwargs):
        super(AladinBestSpider, self).__init__(*args, **kwargs)
        self.cid = cid
        self.year = year
        self.month = month
        self.week = week

    def start_requests(self):
        urls = [
            f'https://www.aladin.co.kr/shop/common/wbest.aspx?BestType=Bestseller&BranchType=1&CID={self.cid}&Year={self.year}&Month={self.month}&Week={self.week}&page={page}&cnt=1000&SortOrder=1'
            for page in range(1, 21)
        ]

        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse, meta={'year': self.year, 'month': self.month})


    # 데이터 추출
    def parse(self, response):
        # meta에서 year와 month 추출
        year = response.meta['year']
        month = response.meta['month']

        id = response.css('div#newbg_body div.ss_book_box::attr(itemid)').getall()
        publication_date_bef = response.xpath('//div[@class="ss_book_list"][1]/ul/li[last()-2]/text()[last()]').getall()
        publication_date = [date[3:] for date in publication_date_bef]
        category = response.css('td.megaseller_t2 > font::text').get()
        title = response.css('.ss_book_list > ul > li:nth-last-child(4) > a > b::text').getall()
        author = response.css('.ss_book_list:nth-child(1) > ul > li:nth-last-child(3) > a:nth-child(1)::text').getall()
        publisher = response.css('.ss_book_list:nth-child(1) > ul > li:nth-last-child(3) > a:nth-last-child(1)::text').getall()
        list_price = response.css('.ss_book_list:nth-child(1) > ul > li:nth-last-child(2) > span:nth-child(1)::text').getall()
        selling_price = response.css('.ss_book_list:nth-child(1) > ul > li:nth-last-child(2) > span.ss_p2 > b > span::text').getall()
        sales_point = response.css('.ss_book_list:nth-child(1) > ul > li:nth-last-child(1) > b::text').getall()
        

        # 추출한 데이터를 하나로 묶기
        for id, title, publication_date, author, publisher, list_price, selling_price, sales_point in zip(id, title, publication_date, author, publisher, list_price, selling_price, sales_point):
            yield {
                'id': id,
                'title': title,
                'category': category,
                'publication_date': publication_date,
                'author': author,
                'publisher': publisher,
                'list_price' : list_price,
                'selling_point': selling_price,
                'sales_point': sales_point,
                'best_year': year,
                'best_month': month
            }