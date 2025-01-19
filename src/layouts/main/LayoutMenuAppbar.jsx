import {AppBar, Box, Container, Drawer, IconButton, Toolbar, Typography, useMediaQuery} from "@mui/material";
import React, {useContext, useEffect} from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {RouterMainMenu} from "@/menu/index.jsx";
import {Outlet, useNavigate} from "react-router-dom";
import {grey} from "@mui/material/colors";
import {AuthContext} from "@/store/authContext.js";

// const handleLoggedUser = async () => {
//     //implement an observable here or some interceptor
//     //maybe that validation should be a async function and must block the ui to be render
//     //TODO: implement some cookie validation over api request
//     const token = getLoginToken();
//
//     if (token.length > 0) {
//         console.log(token);
//         return token;
//     }
//     return null
// };


const Offset = () => <Box sx={{height: '86px'}}/>;


export const LayoutMenuAppbar = () => {
    const isScreenBigger = useMediaQuery('(min-width:600px)');
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
    const auth = useContext(AuthContext);

    const navigateTo = useNavigate();

    const handleDrawerToggle = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const drawerWidth = 240;

    useEffect(() => {
        auth.token ?? navigateTo("/auth/login");
    }, [auth]);

    return (
        <Box sx={{display: 'flex'}}>
            <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
                <Toolbar>
                    <IconButton color='inherit' onClick={handleDrawerToggle}
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
                </Toolbar>
            </AppBar>
            <Drawer variant={isScreenBigger ? "permanent" : "temporary"}
                    open={isDrawerOpen}
                    sx={{
                        [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'},
                        flexShrink: 0,
                        width: drawerWidth,
                    }}
                    anchor="left" border={'1px solid red'}>
                <Offset/>
                <RouterMainMenu/>
            </Drawer>

            <Container as={"main"} maxWidth={false} sx={{background: grey[100], marginBottom: 0, minHeight: "100vh"}}>
                <Offset/>
                <Outlet/>
                <Offset/>
            </Container>
        </Box>
    );
};