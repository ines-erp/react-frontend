import { Outlet} from "react-router-dom";
import {OtherModule} from "@/pages/otherModule/index.jsx";
import {HomePage} from "@/pages/home/index.jsx";

export const otherRoutesList = [
    {path: "", element: <OtherModule/>, label:"Other", isInMenu: true, isEnabled: true},
    {path: "jaca", element: <h1>Finances</h1>, label:"Jaca", isInMenu: true, isEnabled: true},
    {path: "melao", element: <h1>Any other</h1>, label:"Other melao", isInMenu: true, isEnabled: true},
]

export const otherRoutes = [
    {
        path: "/other",
        element: <Outlet />,
        children: otherRoutesList.filter(item => item.isEnabled === true)
    }
]