import React, {useEffect, useState} from "react";
import {getFromApiData} from "@/api/inesDataApiV1.js";
import {LayoutDataViewList} from "@/layouts/inner/LayoutDataViewList.jsx";
import {ActionModalPM} from "@/pages/finance/paymentMethod/ActionModalPM.jsx";
import {Box, Button, List, ListItem, ListItemText, Typography} from "@mui/material";
import {Delete, Edit} from "@mui/icons-material";

export const TransactionCategoryDashboard = () => {

    const [categories, setCategories] = useState([]);

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

    const dataHeader = {
        actionButton:
            <ActionModalPM
                type="create"
                size="medium"
                onSave={() => console.log("clicked")}/>,
        title: "Transaction categories"
    };

    const childrenComponent = (
        <List>
            {categories.map((category) => (
                <ListItem key={category.id} sx={{borderBottom: "1px solid #ddd", gap: "8px", paddingY: "16px"}}>
                    <ListItemText>
                        <Typography variant={"h3"} sx={{fontSize: "1.6rem"}}>{category.name}</Typography>
                    </ListItemText>

                    <Button variant="outlined">
                        <Edit size="medium" sx={{marginRight: "8px"}}/>
                        Edit
                    </Button>

                    <Button variant="outlined" color="warning">
                        <Delete sx={{marginRight: "8px"}} size="medium" color="error"/>
                        Delete
                    </Button>
                </ListItem>
            ))}
        </List>
    );

    const dataList = {
        actions: <Box sx={{display: "flex", gap: 1}}></Box>,
        items: childrenComponent,
        title: "All categories",
        totalPages: 10
    };

    return (
        <LayoutDataViewList header={dataHeader} dataList={dataList}/>
    );
};