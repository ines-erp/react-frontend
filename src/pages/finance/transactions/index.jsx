import {Box, Button, ButtonGroup, Card, CardContent, Chip, Container, Paper, Stack, Typography} from "@mui/material";
import {Add, MonetizationOnOutlined} from "@mui/icons-material";
import {green} from "@mui/material/colors";
import {useEffect, useState} from "react";
import {NewTransactionModal} from "@/pages/finance/transactions/newTransactionModal.jsx";
import {TransactionCardResume} from "@/pages/finance/transactions/TransactionCardResume.jsx";
import {DeleteFromApiData, getFromApiData, PostToApiData} from "@/api/inesDataApiV1.js";
import {Badge} from "@/components/base/Badge.jsx";
import {Breadcrumbs} from "@/components/base/Breadcrumbs.jsx";
import {PageHeader} from "@/components/base/PageHeader.jsx";


// TODO: COLLECT THAT INFORMATION FROM API
const CATEGORIES = [
    {
        value: 'bills',
        label: 'Bills',
    },
    {
        value: 'investments',
        label: 'Investments',
    }
];
const PAYMENTMETHODS = [
    {
        value: 'cash',
        label: 'Cash',
        currency: {
            value: 'EUR',
            label: '€',
            name: 'Euro'

        }
    },
    {
        value: 'card-0244',
        label: 'Card final: 0244',
        currency: {
            value: 'EUR',
            label: '€',
            name: 'Euro'

        }
    }
];
const CURRENCIES = [
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


export const TransactionsDashboard = () => {

    const [transactions, setTransactions] = useState([]);
    const [balance, setBalance] = useState({});
    const [currency, setCurrency] = useState("BRL");

    //modal
    const [open, setOpen] = useState(false);
    const [categories, setCategories] = useState(CATEGORIES);
    const [paymentMethods, setPaymentMethods] = useState(PAYMENTMETHODS);
    const [currencies, setCurrencies] = useState(CURRENCIES);

    //filters
    const [filterTransactionType, setFilterTransactionType] = useState({all: true, incomes: false, outcomes: false});

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleSelectCurrency = (currency) => {
        setCurrency(currency);
    };

    //PROMISES
    const handlePostTransaction = async (body) => {
        await PostToApiData('transactions', body);
        handleGetTransactionsAndBalances();
    };
    const handleDelete = async (id) => {
        const response = await DeleteFromApiData(`transactions/${id}`);
        if (response) {
            handleGetTransactionsAndBalances();
        }
    };

    const handleGetTransactionsAndBalances = async (currency) => {
        const transactionsResponse = await getFromApiData('transactions?' + new URLSearchParams({currency: currency}).toString());
        const balanceResponse = await getFromApiData('balance?' + new URLSearchParams({currency: currency}).toString());

        Promise.all([transactionsResponse, balanceResponse])
            .then(([transactions, balance]) => {
                setTransactions(transactions);
                setBalance(balance);
            });
    };

    useEffect(() => {
        handleGetTransactionsAndBalances(currency);
    }, [currency]);


    const handleSelectTransactionType = (key) => {
        setFilterTransactionType(() => {
            const selected = {
                all: false,
                incomes: false,
                outcomes: false,
            };

            selected[key] = true;

            return selected;
        });
    };

    const outcomes = transactions.filter(transaction => transaction.transactionType.name.toLowerCase() === "outcome");
    const incomes = transactions.filter(transaction => (transaction.transactionType.name).toLowerCase() === "income");

    const totalIncomes = incomes.reduce((acc, current) => acc + current.amount, 0);

    const totalOutcomes = outcomes.reduce((acc, current) => acc + current.amount, 0);

    // TODO: CREATE THEMES AND STYLES FOR ELEMENTS DOWN HERE
    return (
        <Container>

            <NewTransactionModal
                isOpen={open}
                handleClose={handleClose}
                handlePost={handlePostTransaction}
                currencies={currencies}
                categories={categories}
                paymentMethods={paymentMethods}
                data={{currency, paidBy: "Wes"}}
            />

            <PageHeader
                title={"transactions"}
                actionButton={
                    <Button variant="contained" startIcon={<Add/>} onClick={handleClickOpen}>
                        New
                    </Button>
                }
            />


            <Box sx={{minWidth: "25%", gap: 1, display: "flex"}}>
                {currencies.map((option) => (
                    <Badge label={`${option.label} - ${option.name}`} key={option.value} onClick={() => {
                        handleSelectCurrency(option.value)
                    }} isSelected={currency === option.value}/>
                ))}
            </Box>

            <Box sx={{display: "flex", gap: "24px"}}>
                <Card sx={{maxWidth: "240px"}} variant={"filled"}>
                    <CardContent>
                        <Typography variant="caption" sx={{
                            alignItems: "center",
                            display: "flex",
                            gap: "8px",
                        }}>
                            <MonetizationOnOutlined/>
                            Incomes
                        </Typography>

                        <Typography gutterBottom variant="h5" component="div">
                            {balance.symbol} {totalIncomes.toFixed(2)}
                            <Chip label="12.8%" color="success" size="small" sx={{ml: 2}}/>
                        </Typography>

                        <Typography variant="caption">
                            <Typography variant="string" fontWeight="bold" color="success">+ R$ 30,00</Typography> than
                            last month
                        </Typography>
                    </CardContent>
                </Card>

                <Card sx={{maxWidth: "240px"}} variant={"filled"}>
                    <CardContent>
                        <Typography variant={"caption"} sx={{
                            alignItems: "center",
                            display: "flex",
                            gap: "8px",
                        }}>
                            <MonetizationOnOutlined/>
                            Outcomes
                        </Typography>

                        <Typography gutterBottom variant="h5" component="div">
                            {balance.symbol} {totalOutcomes.toFixed(2)}
                            <Chip label="12.8%" color="warning" size="small" sx={{ml: 2}}/>
                        </Typography>

                        <Typography variant="caption">
                            <Typography variant="string" fontWeight="bold" color="warning">- R$ 10,00</Typography> than
                            last month
                        </Typography>
                    </CardContent>
                </Card>

                <Card sx={{maxWidth: "240px", background: green[50]}}
                      variant={"filled"}>
                    <CardContent>
                        <Typography variant={"caption"} sx={{
                            alignItems: "center",
                            display: "flex",
                            gap: "8px",
                        }}>
                            <MonetizationOnOutlined/>
                            Balance
                        </Typography>

                        <Typography gutterBottom variant="h5" component="div">
                            {balance.symbol} {balance.amount}
                            <Chip label="12.8%" color="success" size="small" sx={{ml: 2}}/>
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

            <Paper variant="outlined">
                <Box sx={{display: "flex", justifyContent: "space-between"}}>
                    <Typography variant={"h2"} fontSize={"1.5rem"}>Latests Transactions</Typography>
                    <ButtonGroup>
                        <Button variant={filterTransactionType.all ? "contained" : "outlined"}
                                onClick={() => handleSelectTransactionType("all")}>All</Button>

                        <Button variant={filterTransactionType.incomes ? "contained" : "outlined"}
                                onClick={() => handleSelectTransactionType("incomes")}> Incomes < /Button>

                        <Button variant={filterTransactionType.outcomes ? "contained" : "outlined"}
                                onClick={() => handleSelectTransactionType("outcomes")}>Outcomes</Button>
                    </ButtonGroup>
                </Box>

                <Box sx={{display: "flex", gap: "16px", flexDirection: "column"}}>
                    {transactions.map(transaction => <TransactionCardResume transaction={transaction}
                                                                            onDelete={() => handleDelete(transaction.id)}/>)}
                </Box>
            </Paper>

        </Container>
    );

};






