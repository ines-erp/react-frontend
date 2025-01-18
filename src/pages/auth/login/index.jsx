import {Box, Button, Container, Paper, TextField, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {useRef} from "react";
import {loginToApi} from "@/api/inesAuthApiV1.js";

export const LoginPage = () => {

    const userName = useRef();
    const password = useRef();

    const handleLogin = async () => {
        // http://localhost:5047/api/v1/Auth/Login 
        const loginData = {"password": password.current.value, "username": userName.current.value};
        const isLogged = await loginToApi(loginData);
        console.debug(isLogged);

    };

    return (
        <Container sx={{padding: 4}}>
            <Typography variant={"h1"} mb={4} textAlign={"center"}>INES ERP</Typography>

            <Paper sx={{maxWidth: "45%", minWidth: "350px", mx: "auto", padding: 4}}>
                <Typography variant={"h2"} mb={2}>Please Login</Typography>

                <Box mb={2}>
                    <TextField name="username" inputRef={userName} label="username" type="email" fullWidth={true}/>
                </Box>

                <Box mb={2}>
                    <TextField name="password" inputRef={password} label="password" type="password" fullWidth={true}/>
                </Box>

                <Typography component={Link} to={"/auth/request-new-password"}>
                    Forgot password
                </Typography>

                <Box sx={{display: "flex", justifyContent: "end"}}>
                    <Button variant={"contained"} onClick={handleLogin}>Login</Button>
                </Box>
            </Paper>
        </Container>
    );
};
