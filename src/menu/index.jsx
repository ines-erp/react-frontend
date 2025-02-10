import {menuRoutes} from "@/menu/menuRoutes.jsx";
import {dynamicMenuItems} from "@/menu/dynamicMenuItems.jsx";
import {List} from "@mui/material";


export const RouterMainMenu = (module) => {
    return (
        <List as={'nav'} >
            {dynamicMenuItems(menuRoutes("finance"))}
        </List>
    )
}