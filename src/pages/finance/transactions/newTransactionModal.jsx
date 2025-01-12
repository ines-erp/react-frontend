//TODO: Make generic, extract form and and make a component
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
                                        currencies,
                                        categories,
                                        paymentMethods,
                                        data = {},
                                        isEditing=false,
                                    }) => {

    
    
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
                        "CurrencyId": "7df7cddf-471b-4e17-bc59-70b0ff0a144d",
                        "Date": new Date(event.target.date.value).toISOString(),
                        "Description": event.target.description.value,
                        "Name": event.target.name.value,
                        "PaidBy": event.target.paidBy.value,
                        "PaymentMethodId": "1d69c5c3-9887-47e3-a07d-6cffbb5051f5",
                        "RecievedBy": event.target.receivedBy.value,
                        "TransactionCategoryId": "e25116d5-911d-4d3c-9a36-1edee0398de7",
                        "TransactionTypeId": "fd5e3535-5a7c-4294-abde-49e869d77957"
                    };

                    console.log(newTransaction);
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
                        id={"currency"}
                        name={"currency"}
                        label={"Currency"}
                        select
                        sx={{minWidth: "25%"}}
                        defaultValue={data.currency && data.currency}
                    >
                        {currencies.map((option) => (
                            <MenuItem key={option.value} value={option.name}>{option.label} - {option.name}</MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        id={"paymentMethod"}
                        name={"paymentMethod"}
                        label={"Payment method"}
                        select
                        sx={{minWidth: "25%"}}
                        defaultValue={data.paymentMethod && data.paymentMethod}
                    >
                        {paymentMethods.map((option) => (
                            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                        ))}
                    </TextField>

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
                        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                    ))}
                </TextField>

            </DialogContent>
            <DialogActions sx={{pb: 4}}>
                <Button type="submit" variant={"outlined"}>{isEditing ? "Save": "Create"}</Button>
                <Button onClick={handleClose} variant={"outlined"} color={"error"}>Cancel</Button>
            </DialogActions>
        < /Dialog>
    );
};