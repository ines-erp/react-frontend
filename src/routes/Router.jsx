import {createBrowserRouter} from "react-router-dom";
import {TempLayout} from "@/menu/tempLayout.jsx";
import {menuItemsListInorder} from "@/menu/index.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <TempLayout/>,
        errorElement: <h1>Error</h1>,
        children: [...menuItemsListInorder]

    }]);


export default router