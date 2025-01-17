import {createBrowserRouter, Outlet} from "react-router-dom";
import {menuRoutes} from "@/menu/menuRoutes.jsx";

const router = createBrowserRouter([
    {
        children: [...menuRoutes],
        element: <Outlet/>,
        errorElement: <h1>Error</h1>,
        path: "/"

    }]);


export default router;