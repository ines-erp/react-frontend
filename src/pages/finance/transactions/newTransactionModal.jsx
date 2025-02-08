//TODO: Make generic, extract form and and make a component
import {useEffect, useState} from "react";
import {getFromApiData} from "@/api/inesDataApiV1.js";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormLabel,
    MenuItem,
    Radio,
    RadioGroup,
    TextField
} from "@mui/material";


export const NewTransactionModal = ({
                                        isOpen,
                                        handleClose,
                                        handlePost,
                                        data = {},
                                        isEditing = false,
                                    }) => {


    const [paymentMethods, setPaymentMethods] = useState();
    const [categories, setCategories] = useState();
    const [types, setTypes] = useState();
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState();

    const getPaymentMethods = async () => {
        const paymentsResponse = await getFromApiData(`paymentmethods`);
        const categoriesResponse = await getFromApiData(`transactionCategories`);
        const typesResponse = await getFromApiData(`transactionTypes`);

        Promise.all([paymentsResponse, categoriesResponse, typesResponse])
            .then(([paymentMethods, categories, types]) => {
                setPaymentMethods(paymentMethods);
                setCategories(categories);
                setTypes(types);
            });

    };


    const handleSelectPaymentMethod = (paymentMethod) => {
        setSelectedPaymentMethod(paymentMethod[0]);
    };


    useEffect(() => {
        getPaymentMethods();
    }, []);


    if (!categories & !paymentMethods && !types) {
        return <></>;
    }


    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            PaperProps={{
                component: "form",
                onSubmit: (event) => {
                    event.preventDefault();

                    const newTransaction = {
                        "Amount": event.target.amount.value,
                        "Date": new Date(event.target.date.value).toISOString(),
                        "Description": event.target.description.value,
                        "Name": event.target.name.value,
                        "PaidBy": event.target.paidBy.value,
                        "PaymentMethodId": event.target.paymentMethod.value,
                        "ReceivedBy": event.target.receivedBy.value,
                        "TransactionCategoryId": event.target.category.value,
                        "TransactionTypeId": event.target.transactionType.value
                    };

                    handlePost(newTransaction);
                    handleClose();

                }
            }}
            fullWidth={true}
            maxWidth={"md"}

        >
            <DialogTitle variant={"h3"}>
                {isEditing ? "Editing" : "Adding new"} transaction
            </DialogTitle>

            <DialogContent sx={{display: "flex", flexDirection: "column", gap: 4}}>
                <FormControl>
                    <FormLabel>Transaction type</FormLabel>

                    <RadioGroup defaultValue={data.transactionType}
                                id={"transactionType"}
                                name={"transactionType"}
                                sx={{display: "flex", flexDirection: "row", gap: 2}}>
                        {types.map(transactionType => {
                            return (
                                <FormControlLabel required value={transactionType.id} key={transactionType.id}
                                                  control={<Radio/>}
                                                  label={transactionType.name}/>
                            );
                        })}
                        {/*<FormControlLabel value={"outcome"} control={<Radio/>} label={"Outcome"}/>*/}
                    </RadioGroup>

                </FormControl>
                <TextField
                    required id={"name"}
                    name={"name"}
                    label={"Name"}
                    type={"text"}
                    fullWidth={true}
                    defaultValue={data.name}
                />

                <TextField
                    id={"description"}
                    name={"description"}
                    label={"Description"}
                    multiline
                    rows={6}
                    maxRows={6}
                    fullWidth={true}
                    defaultValue={data.description}
                />

                <Box sx={{display: "flex", gap: 2, width: "100%"}}>
                    <TextField
                        id={"amount"}
                        name={"amount"}
                        label={"Amount"}
                        type={"number"}
                        sx={{flex: 1}}
                        defaultValue={data.amount}
                    />

                    <TextField
                        id={"paymentMethod"}
                        name={"paymentMethod"}
                        label={"Payment method"}
                        select
                        sx={{minWidth: "25%"}}
                        defaultValue={data.paymentMethod}
                        onChange={(e) => handleSelectPaymentMethod(paymentMethods.filter(pm => pm.id === e.target.value))}
                    >
                        {paymentMethods.map((option) => {
                            return (
                                <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>
                            );
                        })}
                    </TextField>

                    <TextField
                        id={"currency"}
                        name={"currency"}
                        label={"Currency"}
                        // Select
                        disabled={true}
                        sx={{minWidth: "25%"}}
                        value={selectedPaymentMethod ? selectedPaymentMethod.currency.name : data.currency ? data.currency : "No currency selected"}
                        defaultValue={data.currency}
                    />

                    <TextField
                        id={"date"}
                        name={"date"}
                        label={"Date"}
                        type={"date"}
                        defaultValue={data.date}
                        sx={{minWidth: "25%"}}

                    />
                </Box>


                <Box sx={{display: "flex", gap: 2, width: "100%"}}>
                    <TextField
                        id={"paidBy"}
                        name={"paidBy"}
                        label={"Paid By"}
                        type={"text"}
                        sx={{flex: 1}}
                        defaultValue={data.paidBy && data.paidBy}
                    />
                    <TextField
                        id={"receivedBy"}
                        name={"receivedBy"}
                        label={"Received By"}
                        type={"text"}
                        sx={{minWidth: "50%"}}
                        defaultValue={data.receivedBy}
                    />
                </Box>

                <TextField
                    id={"category"}
                    name={"category"}
                    label={"Category"}
                    select
                    defaultValue={data.category}
                >
                    {categories.map((option) => (
                        <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>
                    ))}
                </TextField>

            </DialogContent>
            <DialogActions sx={{pb: 4}}>
                <Button type="submit" variant={"outlined"}>{isEditing ? "Save" : "Create"}</Button>
                <Button onClick={handleClose} variant={"outlined"} color={"error"}>Cancel</Button>
            </DialogActions>
        < /Dialog>
    );
};