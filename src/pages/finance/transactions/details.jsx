import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getFromApiData} from "@/api/helpers/getFromApiData.js";
import {
    Box,
    Button,
    Chip,
    Container,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Paper,
    Typography
} from "@mui/material";
import {blueGrey, grey} from "@mui/material/colors";
import {ContentCopy, Description, DescriptionOutlined, UploadFile} from "@mui/icons-material";

export const TransactionsDetails = () => {

    const {id} = useParams()
    const [transaction, setTransaction] = useState();

    const handleGetTransaction = async () => {
        const data = await getFromApiData(`transactions/${id}`)
        setTransaction(data)
    }

    useEffect(() => {
        handleGetTransaction();
    }, [])

    //TODO: extract that to a new file and make it wide avaliable
    const addToClipboard = (text) => {
        navigator.clipboard.writeText(text)
    }

    if (transaction) {

        const transactionDate = new Date(Date.parse(transaction.date))

        return (
            <Container sx={{ml: 0}}>

                <Typography variant="h1">Transactions details</Typography>
                <Typography variant="h5" color={grey[500]}>
                    <IconButton size="small" color={"inherit"} onClick={() => addToClipboard(transaction.id)}>
                        <ContentCopy fontSize=".8rem"/>
                    </IconButton>

                    {transaction.id}
                </Typography>

                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 4,
                    pb: 4,
                    alignItems: "center",
                    borderBottom: `1px solid ${grey[300]}`
                }}>
                    <Box sx={{width: "100%", pr: "32px"}}>
                        <Typography variant="h5"
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 2,
                                        mb: 1
                                    }}>
                            <Chip label={transaction.transactionType.name}
                                  color={(transaction.transactionType.name).toLowerCase() === "income" ? "success" : "warning"}
                                  sx={{fontWeight: "bold"}}/>
                            {transactionDate.toLocaleDateString()}
                        </Typography>
                        <Box sx={{display: "flex", justifyContent: "space-between", mb: '0', flex: 1, width: "100%"}}>
                            <Typography variant={"h2"} color={blueGrey[600]}>
                                {transaction.name}
                            </Typography>

                            <Typography variant={"h2"} sx={{gap: "1rem", display: "flex"}}
                                        color={transaction.amount > 0 ? "success" : "warning"}>
                                <span>{transaction.currency.symbol}</span>
                                <span>{transaction.amount.toFixed(2)}</span>
                            </Typography>
                        </Box>
                    </Box>

                    <Box
                        sx={{display: "flex", justifyContent: "end", alignItem: "center", gap: 3, mt: 4}}>
                        <Button variant={"outlined"} sx={{background: "#fff"}}>...</Button>
                        <Button variant={"outlined"} sx={{background: "#fff"}}>Edit</Button>
                        <Button variant={"outlined"} color={"error"} sx={{background: "#fff"}}>Delete</Button>
                    </Box>

                </Box>

                <Paper variant={"outlined"} sx={{padding: 4, mt: 4, borderRadius: 2, border: "none"}}>

                    <Box sx={{mb: 4}}>
                        <Typography variant={"h3"} sx={{mb: 4}}>Description</Typography>
                        <Typography variant={"p"} sx={{mb: 4}}>{transaction.description}</Typography>
                    </Box>
                </Paper>

                <Box sx={{display: "flex", gap: 4}}>
                    <Paper variant={"outlined"}
                           sx={{padding: 4, mt: 4, borderRadius: 2, border: "none", mb: 4, maxWidth: "50%", flex: 1}}>
                        <Typography variant={"h3"} sx={{mb: 4}}>Transaction info</Typography>
                        <Typography>Paid by: {transaction.paidBy}</Typography>
                        <Typography>Recieved by: {transaction.recievedBy}</Typography>
                        <Typography>Transaction type: {transaction.transactionType.name}</Typography>
                        <Typography>Payment method: {transaction.paymentMethod.name}</Typography>
                    </Paper>

                    <Paper variant={"outlined"}
                           sx={{padding: 4, mt: 4, borderRadius: 2, border: "none", mb: 4, maxWidth: "50%", flex: 1}}>
                        <Typography variant={"h3"} sx={{mb: 4}}>Currency info</Typography>
                        <Typography>Currency name: <strong>{transaction.currency.name}</strong></Typography>
                        <Typography>Currency symbol: <strong>{transaction.currency.symbol}</strong></Typography>
                        <Typography>Currency code: <strong>{transaction.currency.symbol}</strong></Typography>
                        <Typography>amount: <strong>{transaction.amount}</strong></Typography>
                    </Paper>
                </Box>


                <Paper variant={"outlined"} sx={{padding: 4, mt: 4, borderRadius: 1, border: "none"}}>
                    <Box sx={{mb: 4}}>
                        <Typography variant={"h3"} sx={{mb: 4}}>Attachments</Typography>

                        <List sx={{display: "flex", justifyContent: "start"}}>
                            <ListItem sx={{flex: 1, maxWidth: "25%", minWidth: "200px"}}>
                                <DescriptionOutlined sx={{fontSize: "48px"}}/>
                                File name
                            </ListItem>

                            {/*//TODO: CREATE THE STYLE TO CONFIG HOVER FOR THAT*/}
                            <ListItemButton sx={{maxWidth:"200px", border: `4px dashed ${grey[300]}`, color:grey[300], paddingY:"16px"}}>
                                <UploadFile sx={{fontSize: "48px"}}/>
                                Add new attachment
                            </ListItemButton>
                        </List>
                    </Box>
                </Paper>

                <Box variant={"outlined"} sx={{
                    padding: 4,
                    mt: 4,
                    borderRadius: 1,
                    border: "none",
                    borderTop: `1px solid ${grey[300]}`,
                    opacity: .6
                }}>
                    <Typography variant={"h4"} sx={{mb: 2}}>Logs</Typography>

                    <List>
                        <ListItem sx={{fontWeight: "bold"}}>
                            <Typography variant={"h5"}>
                                Jaca element
                            </Typography>
                        </ListItem>
                    </List>
                </Box>


            </Container>
        )
    }
    return <></>

}
