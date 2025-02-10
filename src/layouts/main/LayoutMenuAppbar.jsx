import {Box, Container, Drawer, useMediaQuery} from "@mui/material";
import React, {useContext, useEffect} from "react";
import {RouterMainMenu} from "@/menu/sidebar/index.jsx";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {grey} from "@mui/material/colors";
import {AuthContext, AuthDispatchContext} from "@/store/authContext.js";
import {getLoginToken, handleLogout} from "@/pages/auth/login/index.jsx";
import {AppBar} from "@/menu/appbar/Appbar.jsx";

const Offset = () => <Box sx={{height: '86px'}}/>;

export const LayoutMenuAppbar = () => {
    const isScreenBigger = useMediaQuery('(min-width:600px)');
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

    const location = useLocation();

    //FIX: username not being updated;
    const {token, username} = useContext(AuthContext);
    const dispatch = useContext(AuthDispatchContext);

    const navigateTo = useNavigate();

    const handleDrawerToggle = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const drawerWidth = 240;

    useEffect(() => {
        const cookieToken = getLoginToken();
        if (cookieToken) {
            return;
        }
        handleLogout(dispatch);
        navigateTo("/auth/login");
    }, [location.pathname]);

    return (
        <Box sx={{display: 'flex'}}>
            <AppBar username={username} onDrawerToggle={handleDrawerToggle} isScreenBigger={isScreenBigger}/>

            <Drawer variant={isScreenBigger ? "permanent" : "temporary"}
                    open={isDrawerOpen}
                    sx={{
                        [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'},
                        flexShrink: 0,
                        width: drawerWidth,
                    }}
                    anchor="left">
                <Offset/>
                <RouterMainMenu />
            </Drawer>

            <Container as={"main"} maxWidth={false} sx={{background: grey[100], marginBottom: 0, minHeight: "100vh"}}>
                <Offset/>
                <Outlet/>
                <Offset/>
            </Container>
        </Box>
    );
};