import {LoginPage} from "@/pages/auth/login/index.jsx";
import {Outlet} from "react-router-dom";

export const authRoutesList = [
    {
        element: <></>,
        icon: "",
        isEnabled: true,
        isInMenu: false,
        label: "Auth",
        namespace: "auth",
        parentLabel: "Auth",
        path: ""
    },
    {
        element: <LoginPage/>,
        isEnabled: true,
        isInMenu: false,
        label: "MENU ROUTE NAME",
        path: "login"
    },
];

export const authRoutesRoutes = [
    {
        children: authRoutesList.filter(item => item.isEnabled === true),
        element: <Outlet/>,
        path: "/auth"
    }
];