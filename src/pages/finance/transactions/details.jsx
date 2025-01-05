import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getFromApiData} from "@/api/helpers/getFromApiData.js";
import {Box, Button, Chip, Container, Paper, Typography} from "@mui/material";

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

    if (!!transaction) {

        const transactionDate = new Date(Date.parse(transaction.date))

        return (
            <Container maxWidth={false}>

                <Typography variant={"h1"}>Trnasctions details</Typography>

                <Box sx={{display: "flex", justifyContent: "end", alignItem: "center", gap: "16px", mt: "32px"}}>
                    <Button variant={"outlined"} sx={{background: "#fff"}}>...</Button>
                    <Button variant={"outlined"} sx={{background: "#fff"}}>Edit</Button>
                    <Button variant={"outlined"} color={"error"} sx={{background: "#fff"}}>Delete</Button>
                </Box>

                <Paper variant={"outlined"} sx={{padding: "32px", mt: "32px", borderRadius: "8px", border: "none"}}>

                    <Typography
                        sx={{display: "flex", alignItems: "center", gap: "16px"}}>{transactionDate.toLocaleDateString()}
                        <Chip label={transaction.transactionType.name}
                              color={(transaction.transactionType.name).toLowerCase() === "income" ? "success" : "warning"}/></Typography>

                    <Box sx={{mb: "32px"}}>
                        <Box sx={{display: "flex", justifyContent: "space-between", mb: '16px'}}>
                            <Typography variant={"h2"}>
                                {transaction.name}
                            </Typography>

                            <Typography variant={"h2"} sx={{gap: "1rem", display: "flex"}}>
                                <span>{transaction.currency.symbol}</span>
                                <span>{transaction.amount.toFixed(2)}</span>
                            </Typography>
                        </Box>
                        <hr/>
                    </Box>

                    <Box sx={{mb: "32px"}}>
                        <Typography variant={"h3"} sx={{mb: "32px"}}>Description</Typography>
                        <Typography variant={"p"} sx={{mb: "32px"}}>{transaction.description}</Typography>
                    </Box>

                    <Box sx={{display:"flex", gap:"32px" }}>

                        <Box sx={{mb: "32px", maxWidth:"50%", flex:1}}>
                            <Typography variant={"h3"} sx={{mb: "32px"}}>Transaction info</Typography>
                            <Typography>Paid by: {transaction.paidBy}</Typography>
                            <Typography>Recieved by: {transaction.recievedBy}</Typography>
                            <Typography>Transaction type: {transaction.transactionType.name}</Typography>
                            <Typography>Payment method: {transaction.paymentMethod.name}</Typography>
                        </Box>

                        <Box sx={{mb: "32px", maxWidth:"50%", flex:1}}>
                            <Typography variant={"h3"} sx={{mb: "32px"}}>Currency info</Typography>
                            <Typography>Currency name: <strong>{transaction.currency.name}</strong></Typography>
                            <Typography>Currency symbol: <strong>{transaction.currency.symbol}</strong></Typography>
                            <Typography>Currency code: <strong>{transaction.currency.symbol}</strong></Typography>
                            <Typography>amount: <strong>{transaction.amount}</strong></Typography>
                        </Box>

                    </Box>

                </Paper>


                <Paper variant={"outlined"} sx={{padding: "32px", mt: "32px", borderRadius: "8px", border: "none"}}>
                    <Box sx={{mb: "32px"}}>
                        <Typography variant={"h3"} sx={{mb: "32px"}}>Atachments</Typography>

                        <ul>
                            <li>Atatchment 01</li>
                            <li>Atatchment 02</li>
                        </ul>
                    </Box>
                </Paper>

                <Paper variant={"outlined"} sx={{padding: "32px", mt: "32px", borderRadius: "8px", border: "none"}}>
                    <Box sx={{mb: "32px"}}>
                        <Typography variant={"h3"} sx={{mb: "32px"}}>Logs</Typography>

                        <ul>
                            <li>{transaction.creteateAt}</li>
                            <li>{transaction.updateAt}</li>
                        </ul>
                    </Box>
                </Paper>


            </Container>
        )
    }
    return <></>

}
