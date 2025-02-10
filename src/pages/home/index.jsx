import {Link} from "react-router-dom";
import {Card, CardContent, Container, Icon, ListItemIcon, Stack, SvgIcon, Typography} from "@mui/material";
import {modulesRoutes} from "@/routes/modulesRoutes.js";
import React from "react";
import {blue} from "@mui/material/colors";

export const HomePage = () => {
    const variantsOfBlue = (initialNumber) => (blue[initialNumber * 100]);

    return (
        <Container>
            <Typography variant="h1">Modules</Typography>

            <Container sx={{
                display: "flex",
                marginY: "64px",
                gap: 4,
                flexWrap: "wrap",
                justifyContent: "space-between"
            }}>

                {Object.values(modulesRoutes).filter((module, index) => module.isInMenu).map((route, index) => {
                        return (
                            <Card key={route.path} variant="filled" sx={{
                                width: '100%',
                                minWidth: "25%",
                                height: "300px",
                                bgcolor: variantsOfBlue(index + 1)
                            }}>
                                <CardContent
                                    as={Link} to={route.path}
                                    style={{textDecoration: "none", color: "inherit"}}
                                    sx={{
                                        display: "flex",
                                        height: "100%",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        margin: 0,
                                        padding: 2,
                                        fontSize: "2rem"
                                    }}>
                                    <Typography variant="h2" sx={{fontSize: "inherit"}}>
                                        {route.label}
                                    </Typography>
                                </CardContent>
                            </Card>)
                    }
                )}
            </Container>
        </Container>
    )
} 