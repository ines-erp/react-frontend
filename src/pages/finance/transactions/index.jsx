import {Box, Breadcrumbs, Button, ButtonGroup, Card, CardContent, Chip, Container, Typography} from "@mui/material";
import {Add, MonetizationOnOutlined} from "@mui/icons-material";
import {green, grey} from "@mui/material/colors";
import {Link, useSearchParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {NewTransactionModal} from "@/pages/finance/transactions/newTransactionModal.jsx";
import {TransactionCardResume} from "@/pages/finance/transactions/TransactionCardResume.jsx";
import {deleteFromApiData, getFromApiData, postToApiData} from "@/api/inesDataApiV1.js";
import {BalanceSection} from "@/pages/finance/transactions/BalanceSection.jsx";
import {SortBy} from "@/components/ui/SortBy.jsx";
import {Filters} from "@/components/ui/Filters.jsx";
import {PaymentMethodsCard} from "@/pages/finance/paymentMethod/PaymentMethodsCard.jsx";
import {LayoutDataViewList} from "@/layouts/inner/LayoutDataViewList.jsx";
import {CURRENCIES} from "@/utils/currencies.js";


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

export const TransactionsDashboard = () => {
    const [currentQueryParams, setCurrentQueryParams] = useSearchParams();
    const searchParams = Object.fromEntries([...currentQueryParams]);

    const [transactions, setTransactions] = useState([]);
    const [balance, setBalance] = useState({});
    const [currency, setCurrency] = useState("EUR");

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
        await handleGetTransactionsAndBalances();
    };
    const handleDelete = async (id) => {
        const response = await deleteFromApiData(`transactions/${id}`);
        if (response) {
            await handleGetTransactionsAndBalances();
        }
    };

    const handleGetTransactionsAndBalances = async (currency) => {
        const transactionsResponse =  getFromApiData('transactions', searchParams);
        const balanceResponse = getFromApiData('balance?' + new URLSearchParams({currency: currency}).toString());

        await Promise.all([transactionsResponse, balanceResponse])
            .then(([transactions, balance]) => {
                setTransactions(transactions);
                setBalance(balance);
            });
    };

    useEffect(() => {
        handleGetTransactionsAndBalances(currency);
    }, [currentQueryParams]);


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

    const outcomes = transactions && transactions.filter(transaction => transaction.transactionType.name.toLowerCase() === "outcome");
    const incomes = transactions && transactions.filter(transaction => (transaction.transactionType.name).toLowerCase() === "income");

    const totalIncomes = incomes && incomes.reduce((acc, current) => acc + current.amount, 0);
    const totalOutcomes = outcomes && outcomes.reduce((acc, current) => acc + current.amount, 0);

    const header = {
        title: "Transactions",
        breadcrumbs: {previous:[{label:"finance", path:"/finance"}], current:"Transactions"},
        actionButton: <Button variant="contained" startIcon={<Add/>} onClick={handleClickOpen}>
            New
        </Button>
    }

    const middleSection = {
        isVisible: true,
        limit: 3,
        content: <BalanceSection balance={balance} totalIncomes={totalIncomes} totalOutcomes={totalOutcomes} />
    }

    const sortOptions = [
        {value: "currency", label: "Currency"},
        {value: "name", label: "Name"},
        {value: "amount", label: "Amount"},
        {value: "", label: "Created At"},
    ]

    const dataList = {
        title: "Latest Transactions",
        totalPages: 10,
        actions: <Box sx={{display: "flex", gap: 1, width:"100%", justifyContent:"flex-end"}}>
            <SortBy
                sortOptions={sortOptions}
                currentQueryParams={currentQueryParams}
                setCurrentQueryParams={setCurrentQueryParams}
            />
            {/*<Filters*/}
            {/*    currentQueryParams={currentQueryParams} setCurrentQueryParams={setCurrentQueryParams}*/}
            {/*    filterOptions={filterListOptions}*/}
            {/*/>*/}
        </Box>,

        items: transactions.map((transaction) => {
            return (
                <TransactionCardResume transaction={transaction}
                                       onDelete={() => handleDelete(transaction.id)}/>
            )
        })
    }

    const badgeFilters = {
        isVisible: true,
        field: searchParams.currency,
        onClick: (value) => {
            searchParams.currency = value
            setCurrentQueryParams(searchParams);
        },
        options: currencies.map((item) => ({label: `${item.label} ${item.symbol}`, value: item.value})),
    }
    return (
        <>

            <NewTransactionModal
                isOpen={open}
                handleClose={handleClose}
                handlePost={handlePostTransaction}
                currencies={currencies}
                categories={categories}
                paymentMethods={paymentMethods}
                data={{currency, paidBy: "Wes"}}
            />

            <LayoutDataViewList
                header={header}
                dataList={dataList}
                middleSection={middleSection}
                badgeFilters={badgeFilters}
            />

        </>
    );

};






