import {Link, Outlet} from "react-router-dom";
import {HomePage} from "@/pages/Home/index.jsx";
//example
export const HomeRoutes = [
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