//TODO: finish that implementation when have menu

import {menuRoutes} from "@/menu/menuRoutes.jsx";
import {dynamicMenuItems} from "@/menu/dynamicMenuItems.jsx";
import {List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import MailIcon from '@mui/icons-material/Mail';


export const RouterMainMenu = () => {
    return (
        <List as={'nav'} >
            {dynamicMenuItems(menuRoutes)}
        </List>
    )
}