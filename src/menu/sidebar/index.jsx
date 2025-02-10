import {menuRoutes} from "@/menu/sidebar/menuRoutes.jsx";
import {dynamicMenuItems} from "@/menu/sidebar/dynamicMenuItems.jsx";
import {List} from "@mui/material";
import {useLocation} from "react-router-dom";


export const RouterMainMenu = () => {
    const location = useLocation();
    const pathname = location.pathname.split("/")[1];
    const selectedModule = pathname.length > 1 ? pathname : "home"

    return (
        <List as={'nav'} >
            {dynamicMenuItems(menuRoutes(selectedModule))}
        </List>
    )
}