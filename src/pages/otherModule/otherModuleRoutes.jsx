import { Outlet} from "react-router-dom";
import {OtherModule} from "@/pages/otherModule/index.jsx";

//example
export const otherModuleRoutes = [
    {
        path: "/othermodule",
        element: <Outlet />,
        children: [
            {index: true, element: <OtherModule />},
            {path: "finances", element: <h1>Other Finances</h1>},
            {path: "other", element: <h1>Other Any other</h1>},
        ]
    }
]