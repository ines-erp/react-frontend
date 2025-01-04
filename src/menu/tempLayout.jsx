import {RouterMainMenu} from "@/menu/index.jsx";
import {Outlet} from "react-router-dom";

export const TempLayout = () => {
    return (
        <>
            <RouterMainMenu/>
            <Outlet/>
        </>
    )
} 