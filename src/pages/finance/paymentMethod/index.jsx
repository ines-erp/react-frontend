import {
    Box, Button,
    Card, CardActions,
    CardContent, Stack,
    Typography
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {BiPencil} from "react-icons/bi";
import {Add} from "@mui/icons-material";
import {useEffect, useState} from "react";
import {getFromApiData} from "@/api/helpers/getFromApiData.js";

export const PaymentMethodDashboard = () => {
    const [paymentMethods, setPaymentMethods] = useState([])

    const getPaymentMethods = async () => {
        const data = await getFromApiData("paymentmethod");
        const formatted = data.map((item) => {
            const createdDate = item.createdAt && new Date(item.createdAt).toDateString()
            return {
                ...item,
                createdAt: createdDate
            }
        })
        setPaymentMethods(formatted);
    }
    useEffect(() => {
        getPaymentMethods();
    }, [])

    return (
        <Box sx={{display: "flex", flexDirection: "column", gap: 4}}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                <Typography variant="h4" component="h1">
                    Payment methods
                </Typography>
                <Button variant="contained" startIcon={<Add />}>New</Button>
            </Stack>

            <Box sx={{display: "flex", flexDirection: "column", gap: 4}}>
                {paymentMethods.map((paymentMethod) => {
                    return (
                    <Card key={paymentMethod.id}>
                        <CardContent>
                            <Typography sx={{ color: "text.secondary", mb: 1.5 }}>{paymentMethod.type}</Typography>
                            <Typography variant="h5" component="div">{paymentMethod.name}</Typography>
                            <Typography>{paymentMethod.description}</Typography>
                            <Typography sx={{ color: "text.secondary", mb: 1.5 }}>{paymentMethod.createdAt}</Typography>
                        </CardContent>
                        <CardActions sx={{justifyContent:"end"}}>
                            <Button variant="outlined" size="small" startIcon={<BiPencil />}>Edit</Button>
                            <Button variant="outlined" size="small" color="error" startIcon={<DeleteIcon />}>
                                Delete
                            </Button>
                        </CardActions>
                    </Card>
                )})}
            </Box>

        </Box>
    )
}


