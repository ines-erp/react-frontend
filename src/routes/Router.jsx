import {createBrowserRouter, Link, NavLink, Outlet} from "react-router-dom";

const routesArray = [
    {index: true, element: <h1>Home</h1>},
    {path: "/finances", element: <h1>Finances</h1>}
]

const router = createBrowserRouter([
    {
        path: "/",
        element: <>
            <nav>
                <NavLink className={({isActive}) => isActive ? "active" : undefined} to={"/"} end>Home</NavLink>
                <Link to={"/finances"}>Finances</Link>
            </nav>
            <Outlet></Outlet>
        </>,
        errorElement: <h1>Error</h1>,
        children: routesArray

    }]);

export default router