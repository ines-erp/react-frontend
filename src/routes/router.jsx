import {createBrowserRouter} from "react-router-dom";
import {menuRoutes} from "@/menu/menuRoutes.jsx";
import {LayoutMenuAppbar} from "@/layouts/main/LayoutMenuAppbar.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LayoutMenuAppbar/>,
        errorElement: <h1>Error</h1>,
        children: [...menuRoutes]

    }]);


export default router