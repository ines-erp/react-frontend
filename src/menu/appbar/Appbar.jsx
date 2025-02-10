import {
    IconButton,
    Toolbar,
    Typography,
    AppBar as AppBarUI,
    Menu,
    Box,
    MenuItem,
    Tooltip,
    Avatar,
    Button
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, {useContext, useState} from "react";
import {Link} from "react-router-dom";
import {modulesRoutes} from "@/routes/modulesRoutes.js";
import {handleLogout} from "@/pages/auth/login/index.jsx";
import {blue} from "@mui/material/colors";
import {AuthDispatchContext} from "@/store/authContext.js";


export const AppBar = ({username, onDrawerToggle, isScreenBigger}) => {
    //TODO: update for the user name on profile when is available on api
    const dispatch = useContext(AuthDispatchContext);

    const modules = Object.values(modulesRoutes).filter(module => module.isInMenu);

    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <>
            <AppBarUI position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
                <Toolbar sx={{justifyContent: 'space-between', alignItems: 'center'}}>
                    <IconButton color='inherit' onClick={onDrawerToggle}
                                sx={{display: isScreenBigger ? 'none' : 'flex', marginRight: 2}}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography
                        variant="h4"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            color: 'inherit',
                            fontFamily: 'monospace',
                            fontWeight: 900,
                            letterSpacing: '.6rem',
                            mr: 4,
                            textDecoration: 'none',
                        }}
                    >
                        INES
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        {modules.map((module) => (
                            <Button
                                key={module.path}
                                as={Link}
                                to={module.path}
                                style={{textDecoration: 'none'}}
                                sx={{my: 2, color: 'white', display: 'block'}}
                            >
                                {module.label}
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{flexGrow: 0, display:"flex", gap:1, alignItems:"center", justifyContent:"center"}}>
                        <Typography>{username}</Typography>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                <Avatar sx={{bgcolor:"#fff", color:blue[800], textTransform:"uppercase"}} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{mt: '45px'}}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                        <MenuItem onClick={()=> handleLogout(dispatch)}>
                            <Typography sx={{textAlign: 'center'}}>Logout</Typography>
                        </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBarUI>

            {!isScreenBigger && <AppBarUI position="fixed" color="primary" sx={{top: 'auto', bottom: 0}}>
                <Toolbar sx={{justifyContent: 'space-between', alignItems: 'center'}}>
                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        {modules.map((module) => (
                            <Button
                                key={module.path}
                                as={Link}
                                to={module.path}
                                style={{textDecoration: 'none'}}
                                sx={{my: 2, color: 'white', display: 'block'}}
                            >
                                {module.label}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBarUI>}
        </>
    )
}