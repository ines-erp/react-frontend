import {HomePage} from "@/pages/home/index.jsx";
import {MailLock} from "@mui/icons-material";
import {LayoutMenuAppbar} from "@/layouts/main/LayoutMenuAppbar.jsx";

//example
export const homeRoutesList = [
    {
        element: <HomePage/>,
        icon: <MailLock/>,
        isEnabled: true,
        isInMenu: true,
        label: "Dashboard",
        namespace: "home",
        parentLabel: "Home",
        path: ""
    },
    {
        element: <h1>Finances</h1>,
        isEnabled: false,
        isInMenu: true,
        label: "Finance",
        namespace: "finance",
        path: "finance"
    },
    {
        element: <h1>Any payment</h1>,
        isEnabled: true,
        isInMenu: false,
        label: "payment home",
        namespace: "payment",
        path: "payment"
    },
];

export const homeRoutes = [
    {
        children: homeRoutesList.filter(item => item.isEnabled === true),
        element: <LayoutMenuAppbar/>,
        path: "/home"
    }
];

//

// func for route in routes recursive [namespace:namesapce:namespace]
// func that will split that up list and convert to url pattern