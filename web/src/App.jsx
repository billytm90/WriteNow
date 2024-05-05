import './App.css'
import router from './router.jsx';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {RouterProvider} from "@tanstack/react-router";

// Create a client
const queryClient = new QueryClient()

function App() {

    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    )
}

export default App
