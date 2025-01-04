import {Outlet} from "react-router-dom";
import {HomePage} from "@/pages/home/index.jsx";

//example
export const homeRoutesList = [
    {path: "", element: <HomePage/>, label:"Home", isInMenu: true, isEnabled: true},
    {path: "finances", element: <h1>Finances</h1>, label:"Finance", isInMenu: true, isEnabled: false},
    {path: "payment", element: <h1>Any payment</h1>, label:"payment home", isInMenu: false, isEnabled: true},
]

export const homeRoutes = [
    {
        path: "/home",
        element: <Outlet />,
        children: homeRoutesList.filter(item => item.isEnabled === true)
    }
]

