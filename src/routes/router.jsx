import {createBrowserRouter, Outlet} from "react-router-dom";
import {modulesRoutes} from "@/routes/modulesRoutes.js";

const router = createBrowserRouter([
    {
        children: Object.values(modulesRoutes).map(module => module),
        element: <Outlet/>,
        errorElement: <h1>Error</h1>,
        path: "/"

    }]);


export default router;