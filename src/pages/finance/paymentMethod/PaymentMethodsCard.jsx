import {Box, Button, Card, CardActions, CardContent, Chip, Typography} from "@mui/material";
import {grey} from "@mui/material/colors";
import {Today} from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import {ActionModalPM} from "@/pages/finance/paymentMethod/ActionModalPM.jsx";

export const PaymentMethodsCard = ({paymentMethod, onUpdate, onDelete}) => {
    return (
        <Card key={paymentMethod.id} variant={"outlined"} sx={{ maxHeight:'fit-content'}}>
            <CardContent sx={{height:'100%'}}>
                <Box sx={{display: "flex", gap: 2, alignItems: "center"}}>
                    <Chip variant="outlined" label={paymentMethod.type}/>
                    <Typography variant={"h3"}>{paymentMethod.name}</Typography>
                </Box>
                <Typography>{paymentMethod.description}</Typography>
                {paymentMethod.createdAt &&
                    <Typography variant="body1" component="div"
                                sx={{
                                    display: "flex",
                                    gap: 2,
                                    alignItems: "center",
                                    color: grey[600]
                                }}
                    >
                        <Today color="inherit" fontSize="inherit"/>
                        {paymentMethod.createdAt}
                    </Typography>}
            </CardContent>

            <CardActions sx={{justifyContent: "end"}}>
                <ActionModalPM onSave={onUpdate} currentData={paymentMethod}/>
                <Button variant="outlined" size="medium" color="error" startIcon={<DeleteIcon/>}
                        onClick={() => onDelete(paymentMethod.id)}>
                    Delete
                </Button>
            </CardActions>
        </Card>)
}