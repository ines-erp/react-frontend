import {Link} from "react-router-dom";
import {Button, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import React, {useState} from "react";

/**
 * Function to generate menu items from routes
 * @param routes : menuRoutes[]
 * @returns React.ReactNode
 */
export const dynamicMenuItems = (routes) => {

    return routes.map((route) => {
        return <MenuGroup route={route.children}/>
    })
}

const MenuGroup = ({route}) => {
    const [isVisible, setIsVisible] = useState(false);
    return route.map((childRoute) => {
        if (childRoute.isInMenu && childRoute.isEnabled) {
            const currentPath = `${route.path}/${childRoute.path}`

            switch (!!childRoute.parentLabel) {
                case true:
                    return (<>
                        <ListItem disablePadding sx={{textDecoration: 'none'}} as={Button} onClick={() => {
                            setIsVisible((prev) => !prev)
                        }}>
                            <ListItemButton>
                                {childRoute.icon && <ListItemIcon>
                                    {childRoute.icon}
                                </ListItemIcon>}
                                <ListItemText primary={childRoute.parentLabel}/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding as={Link} to={currentPath}
                                  sx={{textDecoration: 'none', display: isVisible ? "block" : "none"}}>
                            <ListItemButton>
                                <ListItemText primary={childRoute.label}/>
                            </ListItemButton>
                        </ListItem>
                    </>)
                default:
                    return (<ListItem disablePadding as={Link} to={currentPath}
                                      sx={{textDecoration: 'none', display: isVisible ? "block" : "none"}}>
                        <ListItemButton>
                            {childRoute.icon && <ListItemIcon>
                                {childRoute.icon}
                            </ListItemIcon>}
                            <ListItemText primary={childRoute.label}/>
                        </ListItemButton>
                    </ListItem>)
            }
        }
        return null
    })
}