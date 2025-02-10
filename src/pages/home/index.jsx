import {Link} from "react-router-dom";
import {Container, Stack, Typography} from "@mui/material";
import {modulesRoutes} from "@/routes/modulesRoutes.js";

// TODO: Update here to be cards of modules instead of simple links
// TODO: instead of navigating, update the store value
export const HomePage =() => {
    return (
        <Container>
            <Typography>Choose the module here or in top</Typography>

            <Stack direction="column">

            {Object.values(modulesRoutes).map((route, index) => {
                console.log(route)
                    return <Link to={route.path}>{route.label}</Link>
                }
            )}
            </Stack>
        </Container>
    )
} 