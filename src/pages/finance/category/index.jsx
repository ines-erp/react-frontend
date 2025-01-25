import React, {useEffect, useState} from "react";
import {getFromApiData} from "@/api/inesDataApiV1.js";
import {LayoutDataViewList} from "@/layouts/inner/LayoutDataViewList.jsx";
import {ActionModalPM} from "@/pages/finance/paymentMethod/ActionModalPM.jsx";
import {Box, Button, Card, CardActionArea, CardContent} from "@mui/material";
import {Edit} from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";

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


    const dataHeader = {
        actionButton:
            <ActionModalPM
                type="create"
                size="medium"
                onSave={() => console.log("clicked")}/>,
        title: "Transaction categories"
    };


    const dataList = {
        actionButtons: <Box sx={{display: "flex", gap: 1}}>
        </Box>,
        children:
            categories.map(category => {
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
            }),
        title: "All categories",
        totalPages: 10
    };

    return (
        <LayoutDataViewList header={dataHeader} dataList={dataList}/>
    );
};