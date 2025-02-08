import {Box, Breadcrumbs, Button, ButtonGroup, Card, CardContent, Chip, Container, Typography} from "@mui/material";
import {Add, MonetizationOnOutlined} from "@mui/icons-material";
import {green, grey} from "@mui/material/colors";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {NewTransactionModal} from "@/pages/finance/transactions/newTransactionModal.jsx";
import {TransactionCardResume} from "@/pages/finance/transactions/TransactionCardResume.jsx";
import {deleteFromApiData, getFromApiData, postToApiData} from "@/api/inesDataApiV1.js";


// TODO: COLLECT THAT INFORMATION FROM API
const CATEGORIES = [
    {
        label: 'Bills',
        value: 'bills',
    },
    {
        label: 'Investments',
        value: 'investments',
    }
];
const PAYMENTMETHODS = [
    {
        currency: {
            label: '€',
            name: 'Euro',
            value: 'EUR'

        },
        label: 'Cash',
        value: 'cash'
    },
    {
        currency: {
            label: '€',
            name: 'Euro',
            value: 'EUR'

        },
        label: 'Card final: 0244',
        value: 'card-0244'
    }
];
const CURRENCIES = [
    {
        label: '€',
        name: 'Euro',
        value: 'EUR'
    },
    {
        label: 'R$',
        name: 'Brazilian Real',
        value: 'BRL'
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
        await postToApiData('transactions', body);
        handleGetTransactionsAndBalances();
    };
    const handleDelete = async (id) => {
        const response = await deleteFromApiData(`transactions/${id}`);
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
        <Container sx={{ml: 0}}>
            {/*FIX: CHANGE HERE TO THE NEW FormModal component*/}
            <NewTransactionModal
                isOpen={open}
                handleClose={handleClose}
                handlePost={handlePostTransaction}
                currencies={currencies}
                categories={categories}
                paymentMethods={paymentMethods}
                data={{currency, paidBy: "Wes"}}
            />

            <Box sx={{display: "flex", gap: 1}}>
                <Box sx={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
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

            <Box sx={{display: "flex", gap: 1, minWidth: "25%", mt: 6}}>
                {currencies.map((option) => (
                    <Chip label={`${option.label} - ${option.name}`} sx={{fontWeight: "bold"}} size={"medium"}
                          key={option.value}
                          value={option.value} color={currency === option.value ? "primary" : ""} onClick={() => {
                        handleSelectCurrency(option.value);
                    }}/>
                ))}
            </Box>

            <Box sx={{display: "flex", gap: "24px", mb: 4, mt: 2}}>
                <Card sx={{border: "none", borderRadius: 4, flex: 1, maxWidth: "240px"}} variant={"outlined"}>
                    <CardContent>
                        <Typography variant={"h3"} sx={{
                            alignItems: "center",
                            color: 'text.secondary',
                            display: "flex",
                            fontSize: 14,
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

                <Card sx={{border: "none", borderRadius: 4, flex: 1, maxWidth: "240px"}} variant={"outlined"}>
                    <CardContent>
                        <Typography variant={"h3"} sx={{
                            alignItems: "center",
                            color: 'text.secondary',
                            display: "flex",
                            fontSize: 14,
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

                <Card sx={{background: green[50], border: "none", borderRadius: 4, flex: 1, maxWidth: "240px"}}
                      variant={"outlined"}>
                    <CardContent>
                        <Typography variant={"h3"} sx={{
                            alignItems: "center",
                            color: 'text.secondary',
                            display: "flex",
                            fontSize: 14,
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

            <Box sx={{display: "none", gap: "24px"}}>
                <Card sx={{border: "none", flex: 1, maxWidth: "60%", minHeight: "350px"}} variant={"outlined"}>Chart
                    one</Card>
                <Card sx={{border: "none", flex: 1, maxWidth: "40%", minHeight: "350px"}} variant={"outlined"}>Chart
                    one</Card>
            </Box>

            <Box sx={{
                background: "#fff",
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                mt: "32px",
                padding: "32px"
            }}>
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

                <Box sx={{display: "flex", flexDirection: "column", gap: "16px"}}>
                    {transactions.map(transaction => <TransactionCardResume transaction={transaction}
                                                                            onDelete={() => handleDelete(transaction.id)}/>)}
                </Box>
            </Box>

        </Container>
    );

};






