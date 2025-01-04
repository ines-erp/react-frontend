import {Outlet} from "react-router-dom";
import {HomePage} from "@/pages/home/index.jsx";
//example
export const homeRoutes = [
    {
        path: "/home",
        element: <Outlet />,
        children: [
            {index: true, element: <HomePage/>},
            {path: "finances", element: <h1>Finances</h1>},
            {path: "other", element: <h1>Any other</h1>},
        ]
    }
]