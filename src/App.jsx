import {
    createBrowserRouter,
    RouterProvider,
} from "react-router"

import LandingPage from "./pages/LandingPage"
import Login from "./pages/auth/Login"

const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />,
    },
    {
        path: "/login",
        element: <Login />,
    },
])

function App() {
    return <RouterProvider router={router} />
}

export default App