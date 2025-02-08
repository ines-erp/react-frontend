import React, {useEffect, useState} from "react";
import {getFromApiData} from "@/api/inesDataApiV1.js";
import {LayoutDataViewList} from "@/layouts/inner/LayoutDataViewList.jsx";
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    List,
    ListItem,
    ListItemText,
    Radio,
    RadioGroup,
    Typography
} from "@mui/material";
import {Delete, Edit} from "@mui/icons-material";
import {FormModal} from "@/pages/finance/category/edit.jsx";

export const TransactionCategoryDashboard = () => {

    const [categories, setCategories] = useState({data: [], metadata: {}});
    const [isOpen, setIsOpen] = useState(false);

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

    const handleToggleModal = () => {
        setIsOpen(prev => !prev)
    }

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
        <>
            <FormModal isOpen={isOpen} handlePost={() => console.log("Saving data")} isEditing={false}
                       handleClose={handleToggleModal}>
                <FormControl>
                    <FormLabel>Transaction type</FormLabel>

                    <RadioGroup defaultValue={1}
                                id={"transactionType"}
                                name={"transactionType"}
                                sx={{display: "flex", flexDirection: "row", gap: 2}}>
                        {[{"id": 2, "name": "jaca"}, {"id": 1, "name": "amora"}].map(transactionType => {
                            return (
                                <FormControlLabel required value={transactionType.id} key={transactionType.id}
                                                  control={<Radio/>}
                                                  label={transactionType.name}/>
                            );
                        })}
                        {/*<FormControlLabel value={"outcome"} control={<Radio/>} label={"Outcome"}/>*/}
                    </RadioGroup>

                </FormControl>
            </FormModal>

            <LayoutDataViewList header={dataHeader} dataList={dataList}/>
        </>
    );
};