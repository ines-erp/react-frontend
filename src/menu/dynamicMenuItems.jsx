import {NavLink, useLocation} from "react-router-dom";
import {Divider, ListItemButton, ListItemIcon, ListItemText, styled} from "@mui/material";
import React, {useState} from "react";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import {blue, blueGrey} from "@mui/material/colors";

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
    const location = useLocation();
    const isParentPathSelected = location.pathname.split('/')[1] === route.path.split('/')[1];

    const [isVisible, setIsVisible] = useState(false);

    return route.children.map((childRoute) => {
        if (childRoute.isInMenu && childRoute.isEnabled) {
            const currentPath = `${route.path}/${childRoute.path}`
            const isChildRouteDerivativePage = isParentPathSelected && location.pathname.split('/')[2] === childRoute.path

            switch (!!childRoute.parentLabel) {
                case true:
                    return (<
                        React.Fragment key={currentPath}>
                        <MenuGroupParent selected={isParentPathSelected} onClick={() => {
                            setIsVisible((prev) => !prev)
                        }}>
                            {childRoute.icon && <ListItemIcon sx={{color: 'inherit'}}>
                                {childRoute.icon}
                            </ListItemIcon>}
                            <ListItemText primary={childRoute.parentLabel}/>
                            {isVisible ? <ExpandLess/> : <ExpandMore/>}
                        </MenuGroupParent>

                        <NavLink to={currentPath} end role={undefined}
                                 style={{textDecoration: 'none', color: 'inherit'}}>
                            {({isActive}) => (
                                <MenuItem selected={isActive || isChildRouteDerivativePage} sx={{display: isVisible ? "block" : "none"}}>
                                    <ListItemText primary={childRoute.label} inset/>
                                </MenuItem>
                            )}
                        </NavLink>

                    </React.Fragment>)

                default:
                    return (
                        <NavLink to={currentPath} end key={currentPath}
                                 style={{textDecoration: 'none', color: 'inherit'}}>
                            {({isActive}) => (
                                <MenuItem selected={isActive || isChildRouteDerivativePage} sx={{display: isVisible ? "block" : "none"}}>
                                    {childRoute.icon &&
                                        <ListItemIcon>
                                            {childRoute.icon}
                                        </ListItemIcon>
                                    }
                                    <ListItemText primary={childRoute.label} inset={!childRoute.icon}/>
                                </MenuItem>
                            )}
                        </NavLink>
                    )
            }
        }
        return null
    })
}


const MenuGroupParent = styled(ListItemButton)(({theme}) => ({
    margin: 8,
    borderRadius: 8,
    color:blueGrey[900],
    '&.Mui-selected': {
        'color': '#fff',
        'background-color': blue[600],
        '&:hover': {
            'color': '#fff',
            'background-color': blue[600],
        },
    },
}));

const MenuItem = styled(ListItemButton)(({theme}) => ({
    margin: 8,
    borderRadius: 8,
    color:blueGrey[900],
    '&.Mui-selected': {
        'color': blueGrey[800],
        'background-color': blue[100],
        '&:hover': {
            'color': blueGrey[800],
            'background-color': blue[100],
        },
        '&:active': {
            'color': blueGrey[800],
        }
    },
}));