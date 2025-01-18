import {AppBar, Box, Container, Drawer, IconButton, Toolbar, Typography, useMediaQuery} from "@mui/material";
import React, {useEffect} from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {RouterMainMenu} from "@/menu/index.jsx";
import {Outlet, useNavigate} from "react-router-dom";
import {grey} from "@mui/material/colors";
import {getLoginToken} from "@/pages/auth/login/index.jsx";

const Offset = () => <Box sx={{height: '86px'}}/>;


export const LayoutMenuAppbar = () => {
    const isScreenBigger = useMediaQuery('(min-width:600px)');
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

    const navigateTo = useNavigate();

    const handleDrawerToggle = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const drawerWidth = 240;

    useEffect(() => {
        //implement an observable here or some interceptor
        const token = getLoginToken();
        if (token) {
            console.log("yee token");
            return;
        }
        navigateTo("/auth/login");
    }, []);

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
                    anchor="left">
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