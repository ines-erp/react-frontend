import {NavLink} from "react-router-dom";
import {Button, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import React, {useState} from "react";

/**
 * Function to generate menu items from routes
 * @param routes : menuRoutes[]
 * @returns React.ReactNode
 */
export const dynamicMenuItems = (routes) => {

    return routes.map((route) => {
        return (
            <React.Fragment key={route.path}>
                <MenuGroup route={route}/>
                <hr/>
            </React.Fragment>
        )
    })
}

const MenuGroup = ({route}) => {
    const [isVisible, setIsVisible] = useState(false);
    return route.children.map((childRoute) => {
        if (childRoute.isInMenu && childRoute.isEnabled) {
            const currentPath = `${route.path}/${childRoute.path}`

            switch (!!childRoute.parentLabel) {
                case true:
                    return (<
                    React.Fragment key={currentPath}>
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


                        <NavLink to={currentPath} end>
                            {({isActive}) => (
                                <ListItem disablePadding
                                          sx={{textDecoration: 'none', display: isVisible ? "block" : "none"}}>
                                    <ListItemButton selected={isActive}>
                                        <ListItemText primary={childRoute.label}/>
                                    </ListItemButton>
                                </ListItem>
                            )}
                        </NavLink>
                    </React.Fragment>)

                default:
                    return (
                        <NavLink to={currentPath} end key={currentPath}>
                            {({isActive}) => (
                                <ListItem disablePadding
                                          sx={{textDecoration: 'none', display: isVisible ? "block" : "none"}}>
                                    <ListItemButton selected={isActive}>
                                        <ListItemText primary={childRoute.label}/>
                                    </ListItemButton>
                                </ListItem>
                            )}
                        </NavLink>
                    )
            }
        }
        return null
    })
}