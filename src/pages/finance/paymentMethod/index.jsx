import {
    Box, Button,
    Card, CardActions,
    CardContent, Modal, Stack, TextField,
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

    const handleUpdate = (paymentMethod) => {
        console.log(paymentMethod)
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
                <Button onClick={()=>{console.log("not implemented")}} variant="contained" startIcon={<Add />}>New</Button>
            </Stack>

            <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
                {paymentMethods.map((paymentMethod) => {
                    return (
                    <PaymentMethodsCard key={paymentMethod.id} paymentMethod={paymentMethod}  onUpdate={handleUpdate}/>
                )})}
            </Box>
        </Box>
    )
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 4,
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    gap:2
};

const PaymentMethodsCard = ({paymentMethod, onUpdate }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        console.log("open", open);
        setOpen(true)
    };
    const handleClose = () => setOpen(false);

    return (
        <>
        <Modal
            open={open}
            onClose={handleOpen}
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Edit Payment Method
                </Typography>
                <TextField label="Type" variant="outlined" fullWidth/>
                <TextField label="Name" variant="outlined" fullWidth/>
                <TextField label="Description" variant="outlined" multiline fullWidth/>
                <Stack direction="row" spacing={2} justifyContent="end">

                <Button variant="contained" onClick={onUpdate}>Update</Button>
                    <Button variant="contained" onClick={handleClose} color="error">Cancel</Button>
                </Stack>
            </Box>
        </Modal>

        <Card key={paymentMethod.id}>
            <CardContent>
                <Typography sx={{ color: "text.secondary", mb: 1.5 }}>{paymentMethod.type}</Typography>
                <Typography variant="h5" component="div">{paymentMethod.name}</Typography>
                <Typography>{paymentMethod.description}</Typography>
                <Typography sx={{ color: "text.secondary", mb: 1.5 }}>{paymentMethod.createdAt}</Typography>
            </CardContent>
            <CardActions sx={{justifyContent:"end"}}>
                <Button variant="outlined" size="small" startIcon={<BiPencil />} onClick={handleOpen}>Edit</Button>
                <Button variant="outlined" size="small" color="error" startIcon={<DeleteIcon />}>
                    Delete
                </Button>
            </CardActions>
        </Card>
        </>
    )
}