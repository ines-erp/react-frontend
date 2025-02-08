import React, {useEffect, useState} from "react";
import {getFromApiData} from "@/api/inesDataApiV1.js";
import {LayoutDataViewList} from "@/layouts/inner/LayoutDataViewList.jsx";
import {ActionModalPM} from "@/pages/finance/paymentMethod/ActionModalPM.jsx";
import {Box, Button, List, ListItem, ListItemText, Typography} from "@mui/material";
import {Delete, Edit} from "@mui/icons-material";

export const TransactionCategoryDashboard = () => {

    const [categories, setCategories] = useState({data: [], metadata: {}});

    //API request
    const handleGetCategories = async () => {
        const transactionCategoriesResponse = getFromApiData("transactionCategories");

        await Promise.all([transactionCategoriesResponse]).then(([categoriesResponse]) => {
            setCategories(({metadata, data}) => {
                // TODO Refactory that to fit the new api response
                data = categoriesResponse;
                metadata = {
                    "apiVersion": 1,
                    "currentPage": 2,
                    "nextPage": null,
                    "perPage": 5,
                    "previousPage": 1,
                    "totalPages": 2
                };
                return {data, metadata};
            });
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

    const childrenComponent = categories.data && (
        <List>
            {categories.data.map((category) => (
                <ListItem key={category.id} sx={{borderBottom: "1px solid #ddd", gap: "8px", paddingY: "16px"}}>
                    <ListItemText>
                        <Typography variant={"h3"} sx={{fontSize: "1.2rem"}}>{category.name}</Typography>
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
        currentPage: categories.metadata.currentPage ?? 1,
        items: childrenComponent,
        title: "All categories",
        totalPages: categories.metadata.totalPages ?? 1
    };

    return (
        <LayoutDataViewList header={dataHeader} dataList={dataList}/>
    );
};