import {Link, Outlet} from "react-router-dom";
//example
export const HomeRoutes = [
    {
        path:"/home",
        element: <>
            {/*<nav>*/}
            {/*    <Link to={""}>Page Home</Link>*/}
            {/*    <Link to={"finances"}>Page home Finances</Link>*/}
            {/*</nav>*/}
            <Outlet></Outlet>
        </>,
        children: [
            {path:"", element:<h1>Dashboard</h1>},
            {path:"finances", element:<h1>Finances</h1>}
        ]
    }
]