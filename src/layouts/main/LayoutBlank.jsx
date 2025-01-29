import {Outlet} from "react-router-dom";
import {Container} from "@mui/material";
import {grey} from "@mui/material/colors";

export const LayoutBlank = ({sx}) => (
    <Container
        maxWidth={false}
        sx={{
            ...sx,
            background: grey[100],
            marginBottom: 0,

            minHeight: "100vh",
        }}
    >
        <Outlet/>
    </Container>);