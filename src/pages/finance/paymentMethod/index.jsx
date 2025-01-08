import {
    Box, Button,
    Card, CardActions,
    CardContent, Container,InputAdornment, Modal, Stack, TextField,
    Typography
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {BiPencil} from "react-icons/bi";
import {Add, Search} from "@mui/icons-material";
import {useEffect, useState} from "react";
import {getFromApiData} from "@/api/helpers/getFromApiData.js";
import {EmptyState} from "@/components/ui/EmptyState.jsx";

export const PaymentMethodDashboard = () => {
    const [paymentMethods, setPaymentMethods] = useState([])
    const [searchBy, setSearchBy] = useState(null)

    const getPaymentMethods = async () => {

        const filter = searchBy ? `search=${searchBy}` : ""
        const data = await getFromApiData(`paymentmethod?${filter}`);
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
    }, [searchBy])

    return (
        <Container sx={{ml:0, display: "flex", flexDirection: "column", gap: 4}}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                <Typography variant="h4" component="h1">
                    Payment methods
                </Typography>
                <ActionModal type="create" size="medium" onSave={() => {
                    console.log("saving create")
                }}/>
            </Stack>
            <TextField
                id="search bar"
                placeholder="Search by..."
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),
                    },
                }}
                variant="outlined"
                size="small"
                sx={{maxWidth: "16rem"}}
            />

            {paymentMethods.length === 0 && <EmptyState>
                <Box sx={{display: "flex", flexDirection: "column", gap: 1, alignItems: "center"}}>
                    {searchBy && <Typography>Try adjust your search</Typography>}

                    {searchBy === null && <>
                        <Typography>Start by adding one payment method</Typography>
                        <Button onClick={() => {
                            console.log("not implemented")
                        }} variant="contained" startIcon={<Add/>}>Add new</Button>
                    </>}
                </Box>
            </EmptyState>}

            {paymentMethods.length > 0 && (
                <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
                    {paymentMethods.map((paymentMethod) => {
                        return (
                            <PaymentMethodsCard
                                key={paymentMethod.id}
                                paymentMethod={paymentMethod}
                                onUpdate={handleUpdate}
                            />
                        )
                    })}
                </Box>
            )}

        </Container>
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
    gap: 2
};

const PaymentMethodsCard = ({paymentMethod, onUpdate}) => {
    return (
        <Card key={paymentMethod.id}>
            <CardContent>
                <Typography sx={{color: "text.secondary", mb: 1.5}}>{paymentMethod.type}</Typography>
                <Typography variant="h5" component="div">{paymentMethod.name}</Typography>
                <Typography>{paymentMethod.description}</Typography>
                <Typography sx={{color: "text.secondary", mb: 1.5}}>{paymentMethod.createdAt}</Typography>
            </CardContent>
            <CardActions sx={{justifyContent: "end"}}>
                <ActionModal onSave={onUpdate}/>
                <Button variant="outlined" size="small" color="error" startIcon={<DeleteIcon/>}>
                    Delete
                </Button>
            </CardActions>
        </Card>
    )
}

const ActionModal = ({onSave, type = "update", ...rest}) => {
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const handleOpen = () => {
        setOpen(true);
    }
    return (
        <>
            <Button variant={type === "update" ? "outlined" : "contained"} size="small"
                    startIcon={type === "update" ? <BiPencil/> : <Add/>}
                    onClick={handleOpen} {...rest}>{type}</Button>

            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{textTransform: "uppercase"}}>
                        {type} Payment Method
                    </Typography>
                    <TextField label="Type" variant="outlined" fullWidth/>
                    <TextField label="Name" variant="outlined" fullWidth/>
                    <TextField label="Description" variant="outlined" multiline fullWidth/>
                    <Stack direction="row" spacing={2} justifyContent="end">

                        <Button variant="contained" onClick={onSave}>{type}</Button>
                        <Button variant="contained" onClick={handleClose} color="error">Cancel</Button>
                    </Stack>
                </Box>
            </Modal>
        </>
    )
}