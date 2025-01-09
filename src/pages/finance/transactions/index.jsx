import {
    Box,
    Breadcrumbs,
    Button,
    ButtonGroup,
    Card,
    CardContent,
    Chip,
    Container,
    IconButton,
    Typography
} from "@mui/material";
import {Add, ContentCopy, MonetizationOnOutlined} from "@mui/icons-material";
import {green, grey} from "@mui/material/colors"
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {getFromApiData} from "@/api/helpers/getFromApiData.js";

export const TransactionsDashboard = () => {

    const [transactions, setTransactions] = useState([])
    const [balance, setBalance] = useState({})
    const [currency, setCurrenty] = useState("Brazilian Real")


    const handleGetTransactions = async () => {
        const data = await getFromApiData('transactions?' + new URLSearchParams({currency: currency}).toString())
        setTransactions(data)
    }

    const handleGetBalance = async () => {
        const data = await getFromApiData('balance?' + new URLSearchParams({currency: currency}).toString())
        setBalance(data[0])
    }


    useEffect(() => {
        handleGetTransactions();
        handleGetBalance();
    }, [])

    const outcomes = transactions.filter(transaction => transaction.transactionType.name.toLowerCase() === "outcome")
    const incomes = transactions.filter(transaction => (transaction.transactionType.name).toLowerCase() === "income")

    const totalIncomes = incomes.reduce((acc, current) => acc + current.amount, 0)

    const totalOutcomes = outcomes.reduce((acc, current) => acc + current.amount, 0)


    return (
        <Container sx={{ml: 0}}>
            <Box sx={{display: "flex", gap: 1}}>
                <Box sx={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}>
                    <Typography variant={"h1"}>Transactions</Typography>
                    <Button variant="contained" startIcon={<Add/>}>
                        New
                    </Button>
                </Box>
            </Box>

            <Breadcrumbs>
                <Link to={"/"}>
                    <Typography variant="h5" color={grey[500]}>
                        Home
                    </Typography>
                </Link>
                <Typography variant="h5" color={grey[500]}>
                    Transactions
                </Typography>
            </Breadcrumbs>


            <Box sx={{display: "flex", gap: "24px", mb: 4, mt: 6}}>
                <Card sx={{maxWidth: "240px", flex: 1, borderRadius: 4, border: "none"}} variant={"outlined"}>
                    <CardContent>
                        <Typography variant={"h3"} sx={{
                            color: 'text.secondary',
                            fontSize: 14,
                            alignItems: "center",
                            display: "flex",
                            gap: "8px",
                            mb: "16px"
                        }}>
                            <MonetizationOnOutlined/>
                            Incomes
                        </Typography>

                        <Typography gutterBottom variant="h5" component="div">
                            {balance.symbol} {totalIncomes.toFixed(2)} <Chip label="12.8%" color="success"
                                                                             size="small"></Chip>
                        </Typography>

                        <Typography variant="caption">
                            <Typography variant="string" fontWeight="bold" color="success">+ R$ 30,00</Typography> than
                            last month
                        </Typography>
                    </CardContent>
                </Card>

                <Card sx={{maxWidth: "240px", flex: 1, borderRadius: 4, border: "none"}} variant={"outlined"}>
                    <CardContent>
                        <Typography variant={"h3"} sx={{
                            color: 'text.secondary',
                            fontSize: 14,
                            alignItems: "center",
                            display: "flex",
                            gap: "8px",
                            mb: "16px"
                        }}>
                            <MonetizationOnOutlined/>
                            Outcomes
                        </Typography>

                        <Typography gutterBottom variant="h5" component="div">
                            -{balance.symbol} {totalOutcomes.toFixed(2)} <Chip label="12.8%" color="warning"
                                                                               size="small"></Chip>
                        </Typography>

                        <Typography variant="caption">
                            <Typography variant="string" fontWeight="bold" color="warning">- R$ 10,00</Typography> than
                            last month
                        </Typography>
                    </CardContent>
                </Card>

                <Card sx={{maxWidth: "240px", flex: 1, borderRadius: 4, background: green[50], border: "none"}}
                      variant={"outlined"}>
                    <CardContent>
                        <Typography variant={"h3"} sx={{
                            color: 'text.secondary',
                            fontSize: 14,
                            alignItems: "center",
                            display: "flex",
                            gap: "8px",
                            mb: "16px"
                        }}>
                            <MonetizationOnOutlined/>
                            Balance
                        </Typography>

                        <Typography gutterBottom variant="h5" component="div">
                            {balance.symbol} {balance.amount} <Chip label="12.8%" color="success" size="small"></Chip>
                        </Typography>

                        <Typography variant="caption">
                            <Typography variant="string" fontWeight="bold" color="success">+ R$ 20,00</Typography> than
                            last month
                        </Typography>
                    </CardContent>

                </Card>
            </Box>

            <Box sx={{gap: "24px", display: "none"}}>
                <Card sx={{maxWidth: "60%", flex: 1, minHeight: "350px", border: "none"}} variant={"outlined"}>Chart
                    one</Card>
                <Card sx={{maxWidth: "40%", flex: 1, minHeight: "350px", border: "none"}} variant={"outlined"}>Chart
                    one</Card>
            </Box>

            <Box sx={{
                background: "#fff",
                padding: "32px",
                mt: "32px",
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                gap: "24px"
            }}>
                <Box sx={{display: "flex", justifyContent: "space-between"}}>
                    <Typography variant={"h2"} fontSize={"1.5rem"}>Latests Transactions</Typography>
                    <ButtonGroup>
                        <Button variant={"contained"}>All</Button>
                        <Button>Incomes</Button>
                        <Button>Outcomes</Button>
                    </ButtonGroup>
                </Box>

                <Box sx={{display: "flex", gap: "16px", flexDirection: "column"}}>
                    {transactions.map(transaction => {
                        return (
                            <Card variant={"outlined"} key={transaction.id}
                                  sx={{background: transaction.transactionType.name.toLowerCase() === "income" ? "#00ff0009" : "#ff000009"}}>
                                <CardContent
                                    sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                    <Typography variant={"h3"} fontSize={"1rem"}>{transaction.name}</Typography>
                                    <Typography>{transaction.transactionType.name}</Typography>
                                    <Typography>{transaction.currency.symbol}: {transaction.amount.toFixed(2)}</Typography>
                                    <Typography>{transaction.description}</Typography>

                                    <Box sx={{display: "flex", gap: "8px", alignItems: "center", my: "auto"}}>
                                        <Button as={Link} variant={"outlined"} sx={{background: "#fff"}}
                                                to={`details/${transaction.id}`}>Details</Button>
                                        <Button componet={Link} variant={"outlined"} color={"error"}
                                                sx={{background: "#fff"}}>Delete</Button>
                                    </Box>
                                </CardContent>
                                <Box></Box>
                            </Card>
                        )
                    })}
                </Box>
            </Box>

        </Container>
    )

}