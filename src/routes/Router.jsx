import {createBrowserRouter, Link, NavLink, Outlet} from "react-router-dom";
import {HomeRoutes} from "@/pages/Home/Routes.jsx";

//helper function to menu dynamically
const creatingDinamicMenu = (routingObjLikeArray) => {

    let path;
    const linksToNav = []

    for (let route of routingObjLikeArray) {
        path = route.path
        linksToNav.push(path)
        for (let child of route.children) {
            if (child.path) {
                linksToNav.push(`${path}/${child.path}`)
            }
        }
    }

    return linksToNav.map((menuItem) => {
        return <li key={menuItem}><Link to={menuItem}>{menuItem.split("/")}</Link></li>
    })
}

const homeMenu = creatingDinamicMenu(HomeRoutes);
const financeMenu = creatingDinamicMenu(HomeRoutes);

const router = createBrowserRouter([
    {
        path: "/",
        element: <>
            Login
            <ul>
                {homeMenu}
                {financeMenu}
            </ul>
            <Outlet>
            </Outlet>
        </>,
        errorElement: <h1>Error</h1>,
        children: [...HomeRoutes]

    }]);


export default router