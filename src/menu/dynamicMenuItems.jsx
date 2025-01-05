import {NavLink} from "react-router-dom";
import {Button, Collapse, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import React, {useState} from "react";
import {ExpandLess, ExpandMore} from "@mui/icons-material";

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
                <Divider/>
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
                        <ListItemButton onClick={() => {
                            setIsVisible((prev) => !prev)
                        }}>
                            {childRoute.icon && <ListItemIcon>
                                {childRoute.icon}
                            </ListItemIcon>}
                            <ListItemText primary={childRoute.parentLabel}/>
                            {isVisible ? <ExpandLess/> : <ExpandMore/>}
                        </ListItemButton>

                        <Collapse in={isVisible} timeout="auto" unmountOnExit>
                            <NavLink to={currentPath} end role={undefined}>
                                {({isActive}) => (
                                    <ListItemButton selected={isActive}>
                                        <ListItemText primary={childRoute.label} inset/>
                                    </ListItemButton>
                                )}
                            </NavLink>
                        </Collapse>
                    </React.Fragment>)

                default:
                    return (
                        <NavLink to={currentPath} end key={currentPath}>
                            {({isActive}) => (
                                <ListItemButton selected={isActive}>
                                    {childRoute.icon &&
                                        <ListItemIcon>
                                            {childRoute.icon}
                                        </ListItemIcon>
                                    }
                                    <ListItemText primary={childRoute.label}/>
                                </ListItemButton>
                            )}
                        </NavLink>
                    )
            }
        }
        return null
    })
}