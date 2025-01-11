import {useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    TextField
} from "@mui/material";
import {BiPencil} from "react-icons/bi";
import {Add} from "@mui/icons-material";

//TODO: this must come from the endpoint to be created
const currenciesAvailable = [
    {
        "name": "Euro",
        "symbol": "€",
        "isoCode": "EUR"
    },
    {
        "name": "Brazilian Real",
        "symbol": "R$",
        "isoCode": "BRL"
    },
    {
        "name": "Dollar",
        "symbol": "$",
        "isoCode": "USD"
    }
]

export const ActionModalPM = ({onSave, type = "update",currentData = {}, ...rest}) => {
    const [open, setOpen] = useState(false);

    const handleClose = () => setOpen(false);

    const handleOpen = () => {
        setOpen(true);
    }


    const handleSave = (e) => {
        e.preventDefault();
        const {name, type, description, currency} = e.target;

        const paymentMethod = {
            id: currentData.id,
            type: type.value,
            name: name.value,
            description: description.value,
            ISOCurrencySymbol: currency.value,
        }
        onSave(paymentMethod);
        handleClose();
    }

    return (
        <>
            <Button variant={type === "update" ? "outlined" : "contained"} size="medium"
                    startIcon={type === "update" ? <BiPencil/> : <Add/>}
                    onClick={handleOpen} {...rest}>{type}</Button>

            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={true}
                maxWidth={"md"}
                component="form"
                onSubmit={handleSave}
            >
                <DialogTitle variant={"h3"} sx={{textTransform: "uppercase",}}>
                    {type} Payment Method
                </DialogTitle>

                <DialogContent sx={{gap: 2, display: "flex", flexDirection: "column"}}>
                    <TextField id="type" label="Type" variant="outlined" fullWidth  defaultValue={currentData.type}/>
                    <TextField id="name" label="Name" variant="outlined" fullWidth  defaultValue={currentData.name}/>
                    <TextField id="description" label="Description" variant="outlined" multiline fullWidth defaultValue={currentData.description}/>
                    <TextField
                        id={"currency"}
                        name={"currency"}
                        label={"Currency"}
                        select
                        sx={{minWidth: "25%"}}
                        defaultValue={currentData.currency && currentData.currency.isoCode}
                    >
                        {currenciesAvailable.map((option) => (
                            <MenuItem key={option.isoCode} value={option.isoCode} >{option.symbol} - {option.name}</MenuItem>
                        ))}
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" type="submit">{type}</Button>
                    <Button variant="contained" onClick={handleClose} color="error">Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}