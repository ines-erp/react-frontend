import {Outlet} from "react-router-dom";
import {HomePage} from "@/pages/home/index.jsx";
import {MailLock} from "@mui/icons-material";

//example
export const homeRoutesList = [
    {path: "", element: <HomePage/>, label:"Dashboard", isInMenu: true, isEnabled: true, icon: <MailLock />, parentLabel:"Home"},
    {path: "finance", element: <h1>Finances</h1>, label:"Finance", isInMenu: true, isEnabled: false },
    {path: "payment", element: <h1>Any payment</h1>, label:"payment home", isInMenu: false, isEnabled: true},
]

export const homeRoutes = [
    {
        path: "/home",
        element: <Outlet />,
        children: homeRoutesList.filter(item => item.isEnabled === true)
    }
]

