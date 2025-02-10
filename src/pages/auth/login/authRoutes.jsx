import {LoginPage} from "@/pages/auth/login/index.jsx";
import {LayoutBlank} from "@/layouts/main/LayoutBlank.jsx";

export const authRoutesList = [
    {
        element: <LoginPage/>,
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
        element: <LayoutBlank sx={{display: "flex", alignItems: "center", justifyContent: 'center'}}/>,
        path: "/auth",
        label: "Auth",
    }
];