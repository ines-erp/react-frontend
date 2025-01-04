import {
    AppBar,
    Box, Container, Drawer,
    IconButton,
    Toolbar,
    Typography,
    useMediaQuery
} from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {RouterMainMenu} from "@/menu/index.jsx";
import {Outlet} from "react-router-dom";

const Offset = () => <Box sx={{height: '86px'}}/>


export const LayoutMenuAppbar = () => {
    const isScreenBigger = useMediaQuery('(min-width:600px)');
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setIsDrawerOpen(!isDrawerOpen);
    }

    const drawerWidth = 240;
    return (
        <Box sx={{display: 'flex'}}>
            <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}} >
                <Toolbar>
                    <IconButton color='inherit' onClick={handleDrawerToggle} sx={{display: isScreenBigger ? 'none' : 'flex', marginRight:2}}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography
                        variant="h4"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 4,
                            fontFamily: 'monospace',
                            fontWeight: 900,
                            letterSpacing: '.6rem',
                            color: 'inherit',
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
                        width: drawerWidth,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'},
                    }}
                    anchor="left" border={'1px solid red'}>
                <Offset/>
                <RouterMainMenu/>
            </Drawer>

            <Container maxWidth={false} id={"main"}>
                <Offset/>
                <Outlet />
            </Container>
        </Box>
    )
}