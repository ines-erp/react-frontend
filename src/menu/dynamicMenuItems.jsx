import {Link} from "react-router-dom";
import {ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import React from "react";

/**
 * Function to generate menu items from routes
 * @param routes : menuRoutes[]
 * @returns React.ReactNode
 */
export const dynamicMenuItems = (routes) => {

    // path: "", element: <HomePage/>, label:"Home", isInMenu: false, isEnabled: false
    return routes.map((route) => {
        return route.children.map((childRoute) => {
            if (childRoute.isInMenu && childRoute.isEnabled) {
                const currentPath = `${route.path}/${childRoute.path}`
                return (
                    <LinkItemMenu path={currentPath} key={childRoute.path} label={childRoute.label}
                                  icon={childRoute.icon}/>
                )
            }
            return null
        })
    })
}

const LinkItemMenu = ({label, path, icon}) => {
    return (
        <ListItem disablePadding sx={{textDecoration: 'none'}} as={Link} to={path}>
            <ListItemButton>
                {icon && <ListItemIcon>
                    {icon}
                </ListItemIcon>}
                <ListItemText primary={label}/>
            </ListItemButton>
        </ListItem>
    )
}