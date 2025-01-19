import {Box, Button, Container, Paper, TextField, Typography} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {useContext, useRef} from "react";
import {AuthContext, AuthDispatchContext} from "@/store/authContext.js";
import {loginToApi} from "@/api/inesAuthApiV1.js";

//TODO: isolate that to a new file and make it wide available
export const getLoginToken = () => {
    const cookies = document.cookie.split(";");
    const tokenCookie = cookies.find(item => item.trim().startsWith("@inesErpAuthToken"));
    if (tokenCookie) {
        return tokenCookie.split("@inesErpAuthToken=")[1];
    }
    return;
};

export function logHout(dispatch) {
    const handleLogout = () => {
        document.cookie = `@inesErpAuthToken=;max-age=${1};domain=localhost;SameSite=true;`;
        dispatch({
            auth: {token: null, username: null},
            type: "logout"
        });
    };
    return handleLogout;
}

export function login(password, userName, dispatch, navigateTo) {
    const handleLogin = async () => {
        const loginData = {"password": password.current.value, "username": userName.current.value};
        const isLogged = await loginToApi(loginData);

        if (isLogged.jwtToken) {
            document.cookie = `@inesErpAuthToken=${isLogged.jwtToken};max-age=${60 * 15};domain=localhost;SameSite=true`;

            dispatch({
                auth: {token: isLogged.jwtToken, username: userName},
                type: "login"
            });
            navigateTo("/home");
        }

    };
    return handleLogin;
}

export const LoginPage = () => {

    const userName = useRef();
    const password = useRef();
    const navigateTo = useNavigate();

    const {token, username} = useContext(AuthContext)
    const dispatch = useContext(AuthDispatchContext);

    const handleLogin = login(password, userName, dispatch, navigateTo);
    const handleLogout = logHout(dispatch);

    if (token) {
        return (
            <>
                <Typography>Already logged in</Typography>
                <Button onClick={handleLogout}>Logout</Button>
            </>
        );
    }

    return (
        <Container sx={{padding: 4}}>
            <Typography variant={"h1"} mb={4} textAlign={"center"}>INES ERP</Typography>

            <Paper sx={{maxWidth: "45%", minWidth: "350px", mx: "auto", padding: 4}}>
                <Typography variant={"h2"} mb={2}>Please Login</Typography>

                <Box mb={2}>
                    <TextField name="username" inputRef={userName} label="username" type="email"
                               fullWidth={true}/>
                </Box>

                <Box mb={2}>
                    <TextField name="password" inputRef={password} label="password" type="password"
                               fullWidth={true}/>
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
