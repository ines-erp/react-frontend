import React, {useEffect, useState} from "react";
import {getFromApiData} from "@/api/inesDataApiV1.js";
import {Box, Breadcrumbs, Button, Card, CardActionArea, CardContent, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {grey} from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import {Edit} from "@mui/icons-material";

export const TransactionCategoryDashboard = () => {

    const [categories, setCategories] = useState(null);

    //API request
    const handleGetCategories = async () => {
        const transactionCategoriesResponse = getFromApiData("transactionCategories");

        Promise.all([transactionCategoriesResponse]).then(([categoriesResponse]) => {
            setCategories(categoriesResponse);
        });
    };

    useEffect(() => {
        handleGetCategories();
    }, []);

    if (categories === null) {
        return <>Loading cagetegories</>;
    }

    return (
        <Box>
            <Typography variant={"h1"}>Categories</Typography>

            {/*TODO: Make it self fed*/}
            <Breadcrumbs>
                <Link to={"/"}>
                    <Typography variant="h5" color={grey[500]}>
                        Home
                    </Typography>
                </Link>

                <Link to={"/finance"}>
                    <Typography variant="h5" color={grey[500]}>
                        Finance
                    </Typography>
                </Link>

                <Typography variant="h5" color={grey[500]}>
                    Transaction Categories
                </Typography>
            </Breadcrumbs>

            <Box sx={{mt: "32px"}}>
                {categories.map(category => {
                    return (
                        // TODO: maybe here we could use some data grid instead of cards.
                        <Card key={category.id} sx={{mt: "16px"}}>
                            <CardContent>
                                <div>
                                    {category.name}
                                </div>
                            </CardContent>
                            <CardActionArea sx={{display: "flex", gap: "16px", justifyContent: "end"}}>
                                {/*TODO: make that button group a component that could be wide used*/}
                                <Button variant="outlined" size="medium" color="primary" startIcon={<Edit/>}
                                        sx={{mr: "8px"}}>
                                    Edit
                                </Button>
                                <Button variant="outlined" size="medium" color="error" startIcon={<DeleteIcon/>}>
                                    Delete
                                </Button>
                            </CardActionArea>
                        </Card>);
                })}
            </Box>
        </Box>
    );
};