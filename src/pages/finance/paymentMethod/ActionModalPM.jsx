import {useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {BiPencil} from "react-icons/bi";
import {Add} from "@mui/icons-material";

export const ActionModalPM = ({onSave, type = "update", ...rest}) => {
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const handleOpen = () => {
        setOpen(true);
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
            >
                <DialogTitle variant={"h3"} sx={{textTransform: "uppercase"}}>
                    {type} Payment Method
                </DialogTitle>

                <DialogContent sx={{gap: 2, display: "flex", flexDirection: "column"}}>
                    <TextField label="Type" variant="outlined" fullWidth/>
                    <TextField label="Name" variant="outlined" fullWidth/>
                    <TextField label="Description" variant="outlined" multiline fullWidth/>

                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={onSave}>{type}</Button>
                    <Button variant="contained" onClick={handleClose} color="error">Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}