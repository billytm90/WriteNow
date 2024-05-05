import {useQuery} from "@tanstack/react-query";
import {Link} from "@tanstack/react-router";

function Books() {
    const {isPending, error, data} = useQuery(
        {
            queryKey: ['books'],
            queryFn: () => fetch('http://localhost:8000/api/books').then((res) => res.json()),
        }
    )

    if (isPending) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    return (
        <>
            <h1>Books</h1>
            {<ul>{(data || []).map(book => (
                <li key={book.id}><Link to={'/books/' + book.id}>{book.title}</Link></li>))}</ul>}
        </>
    )
}

export default Books