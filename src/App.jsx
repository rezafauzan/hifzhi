import {
    createBrowserRouter,
    RouterProvider,
} from "react-router"

import LandingPage from "./pages/LandingPage"
import Login from "./pages/auth/Login"
import Dashboard from "./pages/Dashboard/Dashboard"

const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
    },
])

function App() {
    return <RouterProvider router={router} />
}

export default App