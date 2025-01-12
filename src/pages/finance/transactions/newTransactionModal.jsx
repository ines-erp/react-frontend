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

const CURRENCIES = [
    {
        label: '€',
        name: 'Euro',
        value: 'EUR'
    },
    {
        label: 'R$',
        name: 'Brazilian Real',
        value: 'BRL'
    },

];


export const NewTransactionModal = ({
                                        isOpen,
                                        handleClose,
                                        handlePost,
                                        data = {},
                                        isEditing = false,
                                    }) => {


    const [paymentMethods, setPaymentMethods] = useState([]);
    const [categories, setCategories] = useState([]);

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState({});

    const getPaymentMethods = async () => {
        const paymentsResponse = await getFromApiData(`paymentmethods`);
        const categoriesResponse = await getFromApiData(`transactionCategories`);

        Promise.all([paymentsResponse, categoriesResponse])
            .then(([paymentMethods, categories]) => {
                setPaymentMethods(paymentMethods);
                setCategories(categories);
            });

    };


    const handleSelectPaymentMethod = (paymentMethod) => {
        setSelectedPaymentMethod(paymentMethod[0]);
    };


    useEffect(() => {
        getPaymentMethods();
    }, []);


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
                        "RecievedBy": event.target.receivedBy.value,
                        "TransactionCategoryId": "e25116d5-911d-4d3c-9a36-1edee0398de7",
                        "TransactionTypeId": "fd5e3535-5a7c-4294-abde-49e869d77957"
                    };

                    handlePost(newTransaction);
                    handleClose();

                }
            }}
            fullWidth={true}
            maxWidth={"md"}

        >
            <DialogTitle variant={"h3"}>
                Add new transaction
            </DialogTitle>

            <DialogContent sx={{display: "flex", flexDirection: "column", gap: 4}}>
                <DialogContentText sx={{mb: 3}}>
                    Some example text
                </DialogContentText>

                <FormControl>
                    <FormLabel>Transaction type</FormLabel>

                    <RadioGroup defaultValue={data.transactionType ? data.transactionType : "income"}
                                name={"transaction-type"}
                                sx={{display: "flex", flexDirection: "row", gap: 2}}>
                        <FormControlLabel value={"income"} control={<Radio/>} label={"Income"}/>
                        <FormControlLabel value={"outcome"} control={<Radio/>} label={"Outcome"}/>
                    </RadioGroup>

                </FormControl>
                <TextField
                    required id={"name"}
                    name={"name"}
                    label={"Name"}
                    type={"text"}
                    fullWidth={true}
                    defaultValue={data.name && data.name}
                />

                <TextField
                    id={"description"}
                    name={"description"}
                    label={"Description"}
                    multiline
                    rows={6}
                    maxRows={6}
                    fullWidth={true}
                    defaultValue={data.description && data.description}
                />

                <Box sx={{display: "flex", gap: 2, width: "100%"}}>
                    <TextField
                        id={"amount"}
                        name={"amount"}
                        label={"Amount"}
                        type={"number"}
                        sx={{flex: 1}}
                        defaultValue={data.amount && data.amount}
                    />

                    <TextField
                        id={"paymentMethod"}
                        name={"paymentMethod"}
                        label={"Payment method"}
                        select
                        sx={{minWidth: "25%"}}
                        defaultValue={paymentMethods && paymentMethods}
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
                        value={!!selectedPaymentMethod.currency ? selectedPaymentMethod.currency.name : "No currency selected"}
                        defaultValue={"No currency selected"}
                    />

                    <TextField
                        id={"date"}
                        name={"date"}
                        label={"Date"}
                        type={"date"}
                        defaultValue={data.date ? data.date : new Date().toISOString().split("T")[0]}
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
                        defaultValue={data.recievedBy && data.recievedBy}
                    />
                </Box>

                <TextField
                    id={"category"}
                    name={"category"}
                    label={"Category"}
                    select
                    defaultValue={data.category && data.category}
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