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
        );
    });
};

const MenuGroup = ({route}) => {
        const location = useLocation();
        const isParentPathSelected = location.pathname.split('/')[2] === route.path.split('/')[0];

        const [isVisible, setIsVisible] = useState(false);
        if (route.isInMenu && route.isEnabled) {
            const childrenInMenu = route.children.length > 1 ? route.children.filter(item => item.isInMenu && item.isEnabled) : undefined;
            const currentPath = route.path;

            switch (!!childrenInMenu) {
                case true:
                    return (<
                        React.Fragment key={currentPath}>
                        <MenuItem selected={isParentPathSelected} onClick={() => {
                            setIsVisible((prev) => !prev);
                        }}
                        >
                            {route.icon && <ListItemIcon sx={{color: 'inherit'}}>
                                {route.icon}
                            </ListItemIcon>}
                            <ListItemText primary={route.label}/>
                            {isVisible ? <ExpandLess/> : <ExpandMore/>}
                        </MenuItem>

                        {childrenInMenu.map((childRoute) => {

                            return (<NavLink to={`${currentPath}/${childRoute.path}`} end role={undefined}
                                             style={{color: 'inherit', textDecoration: 'none'}}>
                                {({isActive}) => (
                                    <MenuItem menuLevel={1} selected={isActive}
                                              sx={{display: isVisible ? "block" : "none"}}>
                                        <ListItemText primary={childRoute.label} inset/>
                                    </MenuItem>
                                )}
                            </NavLink>)
                        })}

                    </React.Fragment>)

                default:
                    return (
                        <NavLink to={currentPath} end key={currentPath}
                                 style={{color: 'inherit', textDecoration: 'none'}}>
                            {({isActive}) => (
                                <MenuItem selected={isActive}>
                                    {route.icon &&
                                        <ListItemIcon sx={{color: 'inherit'}}>
                                            {route.icon}
                                        </ListItemIcon>
                                    }
                                    <ListItemText primary={route.label}/>
                                </MenuItem>
                            )}
                        </NavLink>
                    );
            }
        }
    }
;


const MenuItem = styled(ListItemButton)(
    ({theme}) => ({

        '&.Mui-selected': {
            'color': '#fff',
            'background-color': blue[600],
            '&:hover': {
                'color': '#fff',
                'background-color': blue[600],
            },
        },
        color: blueGrey[900],

        variants: [{
            props: (props) =>
                props.menuLevel === 1,
            style: {
                '&.Mui-selected': {
                    '&:active': {
                        'color': blueGrey[800],
                    },
                    '&:hover': {
                        'color': blueGrey[800],
                        'background-color': blue[100],
                    },
                    'background-color': blue[100],
                    'color': blueGrey[800]
                }
            }
        }]
    }));