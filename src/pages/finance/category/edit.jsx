//TODO: Make generic, extract form and and make a component
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";


export const FormModal = ({
                              children,
                              handleClose,
                              handlePost,
                              isOpen,
                              data = {},
                              isEditing = false,
                          }) => {


    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            PaperProps={{
                component: "form",
                onSubmit: handlePost
            }}
            fullWidth={true}
            maxWidth={"md"}

        >
            <DialogTitle variant={"h3"}>
                {isEditing ? `Editing ${data.id}` : "Adding new"}
            </DialogTitle>

            <DialogContent sx={{display: "flex", flexDirection: "column", gap: 4}}>
                {children}
            </DialogContent>

            <DialogActions sx={{pb: 4}}>
                <Button type="submit" variant={"outlined"}>{isEditing ? "Save" : "Create"}</Button>
                <Button onClick={handleClose} variant={"outlined"} color={"error"}>Cancel</Button>
            </DialogActions>
        < /Dialog>
    );
};