import React, {useEffect, useState} from "react";
import {getFromApiData, postToApiData, putToApiData} from "@/api/inesDataApiV1.js";
import {LayoutDataViewList} from "@/layouts/inner/LayoutDataViewList.jsx";
import {Box, Button, List, ListItem, ListItemText, TextField, Typography} from "@mui/material";
import {Delete, Edit} from "@mui/icons-material";
import {FormModal} from "@/pages/finance/category/edit.jsx";

export const TransactionCategoryDashboard = () => {

    const [categories, setCategories] = useState({data: [], metadata: {}});
    const [isOpen, setIsOpen] = useState(false);
    const [editingData, setEditingData] = useState({});

    //API request
    const handleGetCategories = async () => {
        const transactionCategoriesResponse = getFromApiData("transactionCategories");

        await Promise.all([transactionCategoriesResponse]).then(([categoriesResponse]) => {
            setCategories(({metadata, data}) => {
                // TODO: Refactory that to fit the new api response
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

    const handlePostTransactionCategory = async (body) => {
        await postToApiData('transactionCategories', body);
        handleGetCategories();
    };

    const handlePutTransactionCategory = async (id, body) => {
        await putToApiData(`transactionCategories/${id}`, body);
        handleGetCategories();
    };

    //Handling modal open, close editing data
    const handleToggleModal = (data = undefined) => {
        setEditingData(data ?? {});
        setIsOpen(prev => !prev);
    };

    const handleSubmit = async (event, id = "") => {
        event.preventDefault();
        const category = {
            name: event.target.name.value
        };

        //API call here
        if (id) {
            await handlePutTransactionCategory(id, category);
        } else {
            handlePostTransactionCategory(category);
        }

        setIsOpen(false);
    };

    useEffect(() => {
        handleGetCategories();
    }, []);

    const dataHeader = {
        actionButton: (
            <>
                <Button variant={"contained"} onClick={handleToggleModal}>Add new</Button>
            </>
        ),
        title: "Transaction categories"
    };

    const childrenComponent = categories.data && (
        <List>
            {categories.data.map((category) => (
                <ListItem key={category.id} sx={{borderBottom: "1px solid #ddd", gap: "8px", paddingY: "16px"}}>
                    <ListItemText>
                        <Typography variant={"h3"} sx={{fontSize: "1.2rem"}}>{category.name}</Typography>
                    </ListItemText>

                    <Button variant="outlined" onClick={() => handleToggleModal(category)}>
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
        <>
            <FormModal
                isOpen={isOpen}
                handlePost={(event) => handleSubmit(event, editingData.id)}
                isEditing={!!editingData.id}
                handleClose={handleToggleModal}
                data={editingData}
            >

                <TextField id={"name"} label={"Name"} sx={{marginTop: '16px'}}
                           defaultValue={editingData ? editingData.name : ""}/>

            </FormModal>

            <LayoutDataViewList header={dataHeader} dataList={dataList}/>
        </>
    );
};