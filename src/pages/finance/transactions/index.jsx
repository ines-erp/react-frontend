import {Box, Button,} from "@mui/material";
import {Add} from "@mui/icons-material";
import {useSearchParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {NewTransactionModal} from "@/pages/finance/transactions/newTransactionModal.jsx";
import {TransactionCardResume} from "@/pages/finance/transactions/TransactionCardResume.jsx";
import {deleteFromApiData, getFromApiData, postToApiData} from "@/api/inesDataApiV1.js";
import {BalanceSection} from "@/pages/finance/transactions/BalanceSection.jsx";
import {SortBy} from "@/components/ui/SortBy.jsx";
import {Filters} from "@/components/ui/Filters.jsx";
import {LayoutDataViewList} from "@/layouts/inner/LayoutDataViewList.jsx";
import {CURRENCIES} from "@/utils/currencies.js";


// TODO: COLLECT THAT INFORMATION FROM API AND APPLY TO FILTERS AND DATA
// TODO: Add pagination logic

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

    //modal
    const [open, setOpen] = useState(false);
    const [categories, setCategories] = useState(CATEGORIES);
    const [paymentMethods, setPaymentMethods] = useState(PAYMENTMETHODS);
    const [currencies, setCurrencies] = useState(CURRENCIES);


    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
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

    const handleGetTransactionsAndBalances = async () => {
        const currentCurrency = currentQueryParams.get('currency')

        const transactionsResponse =  getFromApiData('transactions', searchParams);
        const balanceResponse = getFromApiData('balance?'+currentCurrency);

        await Promise.all([transactionsResponse, balanceResponse])
            .then(([transactions, balance]) => {
                setTransactions(transactions);
                setBalance(balance[0]);
            });
    };

    useEffect(() => {
        handleGetTransactionsAndBalances();
    }, [currentQueryParams]);


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
    const filterOptions = [
        {label:"Currency", type:"buttons", field:"currency", options: CURRENCIES},
        // TODO: add the transaction type and transaction category after is done on backend
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
            <Filters
                currentQueryParams={currentQueryParams} setCurrentQueryParams={setCurrentQueryParams}
                filterOptions={filterOptions}
            />
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
                data={{currency:currentQueryParams.get("currency")}}
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






