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
                                        amount = 0
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
                        "Name": event.target.name.value,
                        "Description": event.target.description.value,
                        "Amount": event.target.amount.value,
                        "Date": new Date(event.target.date.value).toISOString(),
                        "PaidBy": event.target.paidBy.value,
                        "RecievedBy": event.target.receivedBy.value,
                        "TransactionTypeId": "fd5e3535-5a7c-4294-abde-49e869d77957",
                        "CurrencyId": "7df7cddf-471b-4e17-bc59-70b0ff0a144d",
                        "PaymentMethodId": "1d69c5c3-9887-47e3-a07d-6cffbb5051f5",
                        "TransactionCategoryId": "e25116d5-911d-4d3c-9a36-1edee0398de7"
                    }

                    console.log(newTransaction)
                    handlePost(newTransaction)
                    handleClose()

                }
            }}
            fullWidth={true}
            maxWidth={"md"}

        >
            <DialogTitle variant={"h3"}>
                Add new transaction
            </DialogTitle>

            <DialogContent sx={{gap: 4, display: "flex", flexDirection: "column"}}>
                <DialogContentText sx={{mb: 3}}>
                    Some example text
                </DialogContentText>

                <FormControl>
                    <FormLabel>Transaction type</FormLabel>
                    <RadioGroup defaultValue={"income"} name={"transaction-type"}
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
                />

                <TextField
                    id={"description"}
                    name={"description"}
                    label={"Description"}
                    multiline
                    rows={6}
                    maxRows={6}
                    fullWidth={true}
                />

                <Box sx={{width: "100%", display: "flex", gap: 2}}>
                    <TextField
                        id={"amount"}
                        name={"amount"}
                        label={"Amount"}
                        type={"number"}
                        sx={{flex: 1}}
                    />

                    <TextField
                        id={"currency"}
                        name={"currency"}
                        label={"Currency"}
                        select
                        sx={{minWidth: "25%"}}
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
                        defaultValue={new Date().toISOString().split("T")[0]}
                        sx={{minWidth: "25%"}}
                    />
                </Box>


                <Box sx={{width: "100%", display: "flex", gap: 2}}>
                    <TextField
                        id={"paidBy"}
                        name={"paidBy"}
                        label={"Paid By"}
                        type={"text"}
                        sx={{flex: 1}}
                    />
                    <TextField
                        id={"receivedBy"}
                        name={"receivedBy"}
                        label={"Received By"}
                        type={"text"}
                        sx={{minWidth: "50%"}}
                    />
                </Box>

                <TextField
                    id={"category"}
                    name={"category"}
                    label={"Category"}
                    select
                >
                    {categories.map((option) => (
                        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                    ))}
                </TextField>

            </DialogContent>
            <DialogActions sx={{pb: 4}}>
                <Button type="submit" variant={"outlined"}>Create</Button>
                <Button onClick={handleClose} variant={"outlined"} color={"error"}>Cancel</Button>
            </DialogActions>
        < /Dialog>
    )
}