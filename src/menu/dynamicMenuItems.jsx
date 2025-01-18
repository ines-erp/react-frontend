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
    const isParentPathSelected = location.pathname.split('/')[1] === route.path.split('/')[1];

    const [isVisible, setIsVisible] = useState(false);

    return route.children.map((childRoute) => {
        if (childRoute.isInMenu && childRoute.isEnabled) {
            const currentPath = `${route.path}/${childRoute.path}`;

            switch (!!childRoute.parentLabel) {
                case true:
                    return (<
                        React.Fragment key={currentPath}>
                        <MenuItem selected={isParentPathSelected} onClick={() => {
                            setIsVisible((prev) => !prev);
                        }}>
                            {childRoute.icon && <ListItemIcon sx={{color: 'inherit'}}>
                                {childRoute.icon}
                            </ListItemIcon>}
                            <ListItemText primary={childRoute.parentLabel}/>
                            {isVisible ? <ExpandLess/> : <ExpandMore/>}
                        </MenuItem>

                        <NavLink to={currentPath} end role={undefined}
                                 style={{color: 'inherit', textDecoration: 'none'}}>
                            {({isActive}) => (
                                <MenuItem menuLevel={1} selected={isActive}
                                          sx={{display: isVisible ? "block" : "none"}}>
                                    <ListItemText primary={childRoute.label} inset/>
                                </MenuItem>
                            )}
                        </NavLink>

                    </React.Fragment>);

                default:
                    return (
                        <NavLink to={currentPath} key={currentPath}
                                 style={{color: 'inherit', textDecoration: 'none'}}>
                            {({isActive}) => (
                                <MenuItem menuLevel={1} selected={isActive}
                                          sx={{display: isVisible ? "block" : "none"}}>
                                    {childRoute.icon &&
                                        <ListItemIcon>
                                            {childRoute.icon}
                                        </ListItemIcon>
                                    }
                                    <ListItemText primary={childRoute.label} inset={!childRoute.icon}/>
                                </MenuItem>
                            )}
                        </NavLink>
                    );
            }
        }
        return null;
    });
};


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