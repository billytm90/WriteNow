import {createFileRoute} from "@tanstack/react-router";
import {useQuery} from "@tanstack/react-query";

export const Route = createFileRoute('/books/$bookId')({
    component: Book,
})

function Book() {
    const { bookId } = Route.useParams()
    const { isPending, error, data } = useQuery(
        {
            queryKey: ['books/' + bookId],
            queryFn: () => fetch('http://localhost:8000/api/books/' + bookId).then((res) => res.json()),
        }
    )

    if (isPending) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    return (
        <>
            <h1>{data.title} {data.edition}판</h1>
            <ul>
                <li>{data.author_name}</li>
                <li>{data.publisher_name}</li>
            </ul>
        </>
    )
}


export default Book