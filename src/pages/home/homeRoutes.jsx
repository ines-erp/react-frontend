import {HomePage} from "@/pages/home/index.jsx";
import {MailLock} from "@mui/icons-material";
import {LayoutMenuAppbar} from "@/layouts/main/LayoutMenuAppbar.jsx";
import {Outlet} from "react-router-dom";

export const homeRoutesList = [
    {
        children: [{isEnabled: true, isInMenu: true, element: <HomePage/>, path:""}],
        element: <Outlet />,
        icon: <MailLock/>,
        isEnabled: true,
        isInMenu: true,
        label: "Modules",
        path: ""
    },
];

export const homeRoutes = [
    {
        children: homeRoutesList.filter(item => item.isEnabled === true),
        element: <LayoutMenuAppbar/>,
        path: "/",
        label: "Home",
        isInMenu:true
    }
];
