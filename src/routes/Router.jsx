import {createBrowserRouter, Link, NavLink, Outlet} from "react-router-dom";
import {HomeRoutes} from "@/pages/Home/Routes.jsx";



const router = createBrowserRouter([
    {
        path: "/",
        element: <>
            Login
            <ul>
                <li><Link to={"/"}>Home</Link></li>
                <li><Link to={"/home"}>Page home</Link></li>
                <ul>
                    <li><Link to={"/home"}>Module one home</Link></li>
                    <li><Link to={"/home/finances"}>Module one amora</Link></li>
                </ul>
                <li><Link to={"/moduleOne"}>Module one</Link></li>
            </ul>
            <Outlet>
            </Outlet>
        </>,
        errorElement: <h1>Error</h1>,
        children: [...HomeRoutes]
        
    }]);


export default router