import {useEffect, useState} from "react";
import {deleteFromApiData, getFromApiData, postToApiData, putToApiData} from "@/api/inesDataApiV1.js";
import {Box, Button, List, ListItem, ListItemText, TextField, Typography} from "@mui/material";
import {Delete, Edit} from "@mui/icons-material";
import {FormModal} from "@/components/ui/FormModal.jsx";
import {LayoutDataViewList} from "@/layouts/inner/LayoutDataViewList.jsx";

export const TransactionTypesDashboard = () => {

    const [transactionTypes, setTransactionTypes] = useState({data: [], metadata: {}});
    const [isOpen, setIsOpen] = useState(false);
    const [editingData, setEditingData] = useState({});

    //API request
    const handleGetTransactionTypes = async () => {
        const transactionTypesResponse = getFromApiData("TransactionTypes");

        await Promise.all([transactionTypesResponse]).then(([transactionTypes]) => {
            setTransactionTypes(({metadata, data}) => {
                // TODO: Refactor that to fit the new api response
                data = transactionTypes;
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

    const handlePostTransactionTypes = async (body) => {
        await postToApiData('TransactionTypes', body);
        await handleGetTransactionTypes();
    };

    const handlePutTransactionTypes = async (id, body) => {
        await putToApiData(`TransactionTypes/${id}`, body);
        await handleGetTransactionTypes();
    };

    const handleDeleteTransactionTypes = async (id) => {
        // Fix: add a confirmation
        await deleteFromApiData(`TransactionTypes/${id}`);
        await handleGetTransactionTypes();
    };


    //Handling modal open, close editing data
    const handleToggleModal = (data = undefined) => {
        setEditingData(data ?? {});
        setIsOpen(prev => !prev);
    };

    const handleSubmit = async (event, id = "") => {
        event.preventDefault();
        const transactionType = {
            name: event.target.name.value
        };

        //API call here
        if (id) {
            await handlePutTransactionTypes(id, transactionType);
        } else {
            await handlePostTransactionTypes(transactionType);
        }

        setIsOpen(false);
    };

    useEffect(() => {
        handleGetTransactionTypes();
    }, []);

    const dataHeader = {
        actionButton: (
            <>
                <Button variant={"contained"} onClick={handleToggleModal}>Add new</Button>
            </>
        ),
        title: "Transaction Types"
    };

    const childrenComponent = transactionTypes.data && (
        <List>
            {transactionTypes.data.map((transactionType) => (
                <ListItem key={transactionType.id} sx={{borderBottom: "1px solid #ddd", gap: "8px", paddingY: "16px"}}>
                    <ListItemText>
                        <Typography variant={"h3"} sx={{fontSize: "1.2rem"}}>{transactionType.name}</Typography>
                    </ListItemText>

                    <Button variant="outlined" onClick={() => handleToggleModal(transactionType)} startIcon={<Edit/>}>
                        Edit
                    </Button>

                    <Button variant="outlined" color="error"
                            onClick={() => handleDeleteTransactionTypes(transactionType.id)}
                            startIcon={<Delete/>}
                    >
                        Delete
                    </Button>
                </ListItem>
            ))}
        </List>
    );

    const dataList = {
        actions: <Box sx={{display: "flex", gap: 1}}></Box>,
        currentPage: transactionTypes.metadata.currentPage ?? 1,
        items: childrenComponent,
        title: "All transactionTypes",
        totalPages: transactionTypes.metadata.totalPages ?? 1
    };

    return (
        <>
            <FormModal
                isOpen={isOpen}
                onSubmit={(event) => handleSubmit(event, editingData.id)}
                isEditing={!!editingData.id}
                onClose={handleToggleModal}
                data={editingData}
            >

                <TextField id={"name"} label={"Name"} sx={{marginTop: '16px'}}
                           defaultValue={editingData ? editingData.name : ""}/>

            </FormModal>

            <LayoutDataViewList header={dataHeader} dataList={dataList}/>
        </>
    );
};