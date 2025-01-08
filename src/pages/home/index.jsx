import {RouterMainMenu} from "@/menu/index.jsx";
import {Outlet} from "react-router-dom";
import {homeRoutes} from "@/pages/home/homeRoutes.jsx";
import {Typography} from "@mui/material";

export const HomePage =() => {
    return (
        <>
            <Typography variant='h1'>Home</Typography>
            <Typography variant='h2'>Home</Typography>
            <Typography variant='h3'>Home</Typography>
            <Typography variant='h4'>Home</Typography>
            <Typography variant='h5'>Home</Typography>
            <Typography variant='h6'>Home</Typography>
        </>
    )
} 