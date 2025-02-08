import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";

export const FormModal = ({
                              children,
                              onClose,
                              onSubmit,
                              isOpen,
                              data = {},
                              isEditing = false,
                          }) => {


    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            PaperProps={{
                component: "form",
                onSubmit: onSubmit
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
                <Button onClick={onClose} variant={"outlined"} color={"error"}>Cancel</Button>
            </DialogActions>
        < /Dialog>
    );
};