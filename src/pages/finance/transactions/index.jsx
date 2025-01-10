import {Box, Breadcrumbs, Button, ButtonGroup, Card, CardContent, Chip, Container, Typography} from "@mui/material";
import {Add, MonetizationOnOutlined} from "@mui/icons-material";
import {green, grey} from "@mui/material/colors"
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {DeleteFromApiData, getFromApiData, PostToApiData} from "@/api/helpers/getFromApiData.js";
import {NewTransactionModal} from "@/pages/finance/transactions/newTransactionModal.jsx";

export const TransactionsDashboard = () => {

    const [transactions, setTransactions] = useState([])
    const [balance, setBalance] = useState({})
    const [currency, setCurrency] = useState("Brazilian Real")
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleSelectCurrency = (currency) => {
        setCurrency(currency)
    }

    //PROMISES
    const handlePostTransaction = async (body) => {
        await PostToApiData('transactions', body)
        handleGetTransactions()
    }
    const handleDelete = async (id) => {
        const response = await DeleteFromApiData(`transactions/${id}`);
        if (response) {
            handleGetTransactions()
        }
    }

    const handleGetTransactionsAndBalances = async (currency) => {
        const transactionsResponse = await getFromApiData('transactions?' + new URLSearchParams({currency: currency}).toString())
        const balanceResponse = await getFromApiData('balance?' + new URLSearchParams({currency: currency}).toString())

        Promise.all([transactionsResponse, balanceResponse])
            .then(([transactions, balance]) => {
                setTransactions(transactions);
                setBalance(balance);
            })
    }

    useEffect(() => {
        handleGetTransactionsAndBalances(currency)
    }, [currency])

    const outcomes = transactions.filter(transaction => transaction.transactionType.name.toLowerCase() === "outcome")
    const incomes = transactions.filter(transaction => (transaction.transactionType.name).toLowerCase() === "income")

    const totalIncomes = incomes.reduce((acc, current) => acc + current.amount, 0)

    const totalOutcomes = outcomes.reduce((acc, current) => acc + current.amount, 0)


    return (
        <Container sx={{ml: 0}}>

            <NewTransactionModal
                isOpen={open}
                handleClose={handleClose}
                handlePost={handlePostTransaction}
                currencies={currencies}
                categories={categories}
                paymentMethods={paymentMethods}
            />

            <Box sx={{display: "flex", gap: 1}}>
                <Box sx={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}>
                    <Typography variant={"h1"}>Transactions</Typography>
                    <Button variant="contained" startIcon={<Add/>} onClick={handleClickOpen}>
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

            <Box sx={{minWidth: "25%", mt: 6, gap: 1, display: "flex"}}>
                {currencies.map((option) => (
                    <Chip label={`${option.label} - ${option.name}`} sx={{fontWeight: "bold"}} size={"medium"}
                          key={option.value}
                          value={option.name} color={currency === option.name ? "primary" : ""} onClick={() => {
                        handleSelectCurrency(option.name)
                    }}/>
                ))}
            </Box>

            <Box sx={{display: "flex", gap: "24px", mb: 4, mt: 2}}>
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
                            {balance.symbol} {totalOutcomes.toFixed(2)} <Chip label="12.8%" color="warning"
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
                                    <Typography>{transaction.description.substring(0, 30) + "..."}</Typography>

                                    <Box sx={{display: "flex", gap: "8px", alignItems: "center", my: "auto"}}>
                                        <Button as={Link} variant={"outlined"} sx={{background: "#fff"}}
                                                to={`details/${transaction.id}`}>Details</Button>
                                        <Button componet={Link} variant={"outlined"} color={"error"}
                                                sx={{background: "#fff"}}
                                                onClick={() => handleDelete(transaction.id)}>Delete</Button>
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

const categories = [
    {
        value: 'bils',
        label: 'Bills',
    },
    {
        value: 'investments',
        label: 'Investments',
    }
];

const paymentMethods = [
    {
        value: 'cash',
        label: 'Cash',
    },
    {
        value: 'card-0244',
        label: 'Card final: 0244',
    }
];

const currencies = [
    {
        value: 'EUR',
        label: '€',
        name: 'Euro'
    },
    {
        value: 'BRL',
        label: 'R$',
        name: 'Brazilian Real'
    },

];

