import {
    createBrowserRouter,
    RouterProvider,
} from "react-router"

import LandingPage from "./pages/LandingPage"
import Login from "./pages/auth/Login"
import Dashboard from "./pages/dashboard/Dashboard"
import Quran from "./pages/quran/index"

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
    {
        path: "/quran",
        element: <Quran />,
    },
])

function App() {
    return <RouterProvider router={router} />
}

export default App