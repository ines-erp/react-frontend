import {Outlet} from "react-router-dom";
import {HomePage} from "@/pages/home/index.jsx";

//example
export const homeRoutesList = [
    {path: "", element: <HomePage/>, label:"Home", isInMenu: true, isEnabled: true},
    {path: "finances", element: <h1>Finances</h1>, label:"Finance", isInMenu: true, isEnabled: false},
    {path: "other", element: <h1>Any other</h1>, label:"Other home", isInMenu: true, isEnabled: true},
]

export const homeRoutes = [
    {
        path: "/home",
        element: <Outlet />,
        children: homeRoutesList.filter(item => item.isEnabled === true)
    }
]

