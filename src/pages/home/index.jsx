import {Link} from "react-router-dom";
import {Container, Stack, Typography} from "@mui/material";
import {modulesRoutes} from "@/routes/modulesRoutes.js";

// TODO: Update here to be cards of modules instead of simple links
// TODO: instead of navigating, update the store value
export const HomePage =() => {
    return (
        <Container>
            <Typography >Modules</Typography>

            <Stack direction="column">

            {Object.values(modulesRoutes).filter(module => module.isInMenu).map((route, index) => {
                console.log(route)
                    return <Link to={route.path}>{route.label}</Link>
                }
            )}
            </Stack>
        </Container>
    )
} 