import {createBrowserRouter} from "react-router-dom";
import {TempLayout} from "@/menu/tempLayout.jsx";
import {menuRoutes} from "@/menu/menuRoutes.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <TempLayout/>,
        errorElement: <h1>Error</h1>,
        children: [...menuRoutes]

    }]);


export default router