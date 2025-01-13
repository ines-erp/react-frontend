import {Outlet} from "react-router-dom";
import {HomePage} from "@/pages/home/index.jsx";
import {MailLock} from "@mui/icons-material";

//example
export const homeRoutesList = [
    {
        path: "",
        element: <HomePage/>,
        label: "Dashboard",
        isInMenu: true,
        isEnabled: true,
        icon: <MailLock/>,
        parentLabel: "Home",
        namespace: "home"
    },
    {
        path: "finance",
        element: <h1>Finances</h1>,
        label: "Finance",
        isInMenu: true,
        isEnabled: false,
        namespace: "finance"
    },
    {
        path: "payment",
        element: <h1>Any payment</h1>,
        label: "payment home",
        isInMenu: false,
        isEnabled: true,
        namespace: "payment"
    },
]

export const homeRoutes = [
    {
        path: "/home",
        element: <Outlet />,
        children: homeRoutesList.filter(item => item.isEnabled === true)
    }
]

//

// func for route in routes recursive [namespace:namesapce:namespace]
// func that will split that up list and convert to url pattern