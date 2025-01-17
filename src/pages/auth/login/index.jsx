import {Box, Button, Container, Paper, TextField, Typography} from "@mui/material";
import {Link} from "react-router-dom";

export const LoginPage = () => {
    return (
        <Container sx={{padding: 4}}>
            <Typography variant={"h1"} mb={4} textAlign={"center"}>INES ERP</Typography>

            <Paper sx={{minWidth: "350px", padding: 4, maxWidth: "45%", mx: "auto"}}>
                <Typography variant={"h2"} mb={2}>Please Login</Typography>

                <Box mb={2}>
                    <TextField label="username" type="email" fullWidth={true}/>
                </Box>

                <Box mb={2}>
                    <TextField label="password" type="password" fullWidth={true}/>
                </Box>

                <Typography component={Link} to={"/auth/request-new-password"}>
                    Forgot password
                </Typography>

                <Box sx={{display: "flex", justifyContent: "end"}}>
                    <Button variant={"contained"}>Login</Button>
                </Box>
            </Paper>
        </Container>
    );
};
