import {createRootRoute, createRoute, createRouter, Link, Outlet} from "@tanstack/react-router";
import {TanStackRouterDevtools} from "@tanstack/router-devtools";
import Books from "./Books.jsx";
import Book from "./Book.jsx";


const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: function Index() {
        return (
            <div>
                <h3>Welcome Home!</h3>
            </div>
        )
    },
})



const booksRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/books',
    component: Books
})


const bookRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/books/$bookId',
    component: Book
})


const rootRoute = createRootRoute({
    component: () => (
        <>
            <div>
                <Link to="/">
                    Home
                </Link>{' '}
                <Link to="/books">
                    Books
                </Link>
            </div>
            <hr />
            <Outlet />
            <TanStackRouterDevtools />
        </>
    ),
})


const routeTree = rootRoute.addChildren([bookRoute, booksRoute, indexRoute])

const router = createRouter({ routeTree })

export default router