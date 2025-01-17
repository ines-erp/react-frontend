import {useParams, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {
    Box,
    Button,
    Chip,
    Container, Divider, Grid2,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    Paper, Stack,
    Typography
} from "@mui/material";
import {blue, blueGrey, grey} from "@mui/material/colors";
import {ContentCopy, DescriptionOutlined, UploadFile} from "@mui/icons-material";
import {NewTransactionModal} from "@/pages/finance/transactions/newTransactionModal.jsx";
import {DeleteFromApiData, getFromApiData, putToApiData} from "@/api/inesDataApiV1.js";
import {Breadcrumbs} from "@/components/base/Breadcrumbs.jsx";
import {PageHeader} from "@/components/ui/PageHeader.jsx";


const CATEGORIES = [
    {
        value: 'bils',
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

const INITIALTRANSACTION = {
    "id": null,
    "name": null,
    "description": null,
    "amount": null,
    "date": null,
    "createdAt": null,
    "updatedAt": null,
    "paidBy": null,
    "receivedBy": null,
    "transactionType": {
        "id": null,
        "name": null
    },
    "paymentMethod": {
        "id": null,
        "type": null,
        "name": null,
        "description": null,
        "createdAt": null,
        "updatedAt": null,
        "currency": {
            "name": null,
            "symbol": null,
            "isoCode": null
        }
    },
    "transactionCategory": {
        "id": null,
        "name": null
    }
}

export const TransactionsDetails = () => {

    const {id} = useParams()
    const [transaction, setTransaction] = useState(INITIALTRANSACTION);
    const navigate = useNavigate();

    const [categories, setCategories] = useState(CATEGORIES);
    const [paymentMethods, setPaymentMethods] = useState(PAYMENTMETHODS);
    const [currencies, setCurrencies] = useState(CURRENCIES);

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

    const handleGetTransaction = async () => {
        const data = await getFromApiData(`transactions/${id}`)
        setTransaction(data)
    }
    const handlePutTransaction = async (body) => {
        await putToApiData(`transactions/${id}`, body)
        handleGetTransaction()
    }

    useEffect(() => {
        handleGetTransaction();
    }, [])

    //TODO: extract that to a new file and make it wide avaliable
    const addToClipboard = (text) => {
        navigator.clipboard.writeText(text)
    }

    const handleDelete = async (id) => {
        const response = await DeleteFromApiData(`transactions/${id}`);
        if (response) {
            navigate(-1)
        }
    }

    const {
        name,
        description,
        amount,
        date,
        createdAt,
        updatedAt,
        paidBy,
        receivedBy
    } = transaction;

    const {
        id: transactionTypeId,
        name: transactionTypeName
    } = transaction.transactionType

    const {
        id: categoryId,
        name: categoryName
    } = transaction.transactionCategory

    const {
        id: pymentMethodId,
        type: pymentMethodType,
        name: pymentMethodName,
        description: pymentMethodDescription,
        createdAt: pymentMethodCreatedAt,
        updatedAt: pymentMethodUpdatedAt
    } = transaction.paymentMethod

    const {
        id: currencyId,
        name: currencyName,
        symbol: currencySymbol,
        isoCode: currencyIsoCode
    } = transaction.paymentMethod.currency

    const transactionDate = new Date(Date.parse(transaction.date))

    return (
        <Container>
            <NewTransactionModal
                isOpen={open}
                handleClose={handleClose}
                handlePost={handlePutTransaction}
                currencies={currencies}
                categories={categories}
                paymentMethods={paymentMethods}
                isEditing={true}
                data={{
                    currency: currencyName,
                    paymentMethod: pymentMethodName,
                    transactionType: transactionTypeName,
                    category: categoryName,
                    date: new Date(date).toISOString().split("T")[0],
                    paidBy: paidBy,
                    recievedBy: receivedBy,
                    name: name,
                    description: description,
                    amount: Number(amount),
                }}
            />

            <PageHeader
                title="transaction details"
                actionButton={
                    <Button onClick={() => addToClipboard(transaction.id)} sx={{color: grey[500]}} variant="text" size="small" startIcon={<ContentCopy fontSize=".8rem"/>}>{id}</Button>
                }
            />

            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
            }}>
                <Box sx={{width: "100%", pr: "32px"}}>
                    <Typography variant="h5"
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                }}
                    >
                        <Chip label={transactionTypeName}
                              color={transactionTypeName && (transactionTypeName).toLowerCase() === "income" ? "success" : "warning"}
                              sx={{fontWeight: "bold"}}/>
                        {transactionDate.toLocaleDateString()}
                    </Typography>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: '0',
                        flex: 1,
                        width: "100%"
                    }}>
                        <Typography variant={"h2"} color={blueGrey[600]}>
                            {transaction.name}
                        </Typography>

                        <Typography variant={"h2"} sx={{gap: "1rem", display: "flex"}}
                                    color={transaction.amount > 0 ? "success" : "warning"}>
                            <span>{currencySymbol}</span>
                            <span>{amount && amount.toFixed(2)}</span>
                        </Typography>
                    </Box>
                </Box>

                <Box
                    sx={{display: "flex", justifyContent: "end", alignItem: "center", gap: 1,}}>
                    <Button variant={"outlined"} sx={{background: "#fff"}}>...</Button>
                    <Button variant={"outlined"} sx={{background: "#fff"}}
                            onClick={() => setOpen(true)}>Edit</Button>
                    <Button variant={"outlined"} color={"error"} sx={{background: "#fff"}}
                            onClick={() => handleDelete(transaction.id)}>Delete</Button>
                </Box>
            </Box>

            <Divider/>

            <Paper variant={"outlined"}>
                <Box>
                    <Typography variant={"h3"}>Description</Typography>
                    <Typography variant={"body1"}>{transaction.description}</Typography>
                </Box>
            </Paper>

            <Box sx={{display: "flex", gap: 4}}>
                <Paper variant={"outlined"}
                       sx={{flex: 1, maxWidth: "50%"}}>
                    <Typography variant={"h3"} sx={{mb: 4}}>Transaction info</Typography>

                    <Grid2 spacing={2} container columns={3}>
                        <Grid2 size={3}>
                            <Typography variant={"h5"}>Transaction type:</Typography>
                            <Typography fontSize={"2rem"}
                                        color={transaction.amount > 0 ? "success" : "warning"}>{transaction.transactionType.name}</Typography>
                        </Grid2>

                        <Grid2 size={1}>
                            <Typography variant={"h5"}>Payment method:</Typography>
                            <Typography>{transaction.paymentMethod.name}</Typography>
                        </Grid2>

                        <Grid2 size={1}>
                            <Typography variant={"h5"}>Paid by:</Typography>
                            <Typography>{transaction.paidBy}</Typography>
                        </Grid2>

                        <Grid2 size={1}>
                            <Typography variant={"h5"}>Recieved by:</Typography>
                            <Typography>{transaction.recievedBy}</Typography>
                        </Grid2>
                    </Grid2>
                </Paper>

                <Paper variant={"outlined"}
                       sx={{
                           maxWidth: "50%",
                           flex: 1,
                       }}>

                    <Typography variant={"h3"} sx={{mb: 4}}>Currency info</Typography>

                    <Grid2 container spacing={2} columns={3}
                           sx={{mt: "auto", mb: "0", flex: 1, width: "100%"}}>
                        <Grid2 size={3}>
                            <Typography variant={"h5"}>Amount:</Typography>
                            <Typography color={amount > 0 ? "success" : "warning"}
                                        fontSize={'2rem'}>{currencySymbol} {amount}</Typography>
                        </Grid2>

                        <Grid2 size={1}>
                            <Typography variant={"h5"}>Currency name:</Typography>
                            <Typography>{currencyName}</Typography>
                        </Grid2>

                        <Grid2 size={1}>
                            <Typography variant={"h5"}>Currency code:</Typography>
                            {/*TODO: IN API CREATE A CODE THAT MATCHES THE ISO CODE FOR CURRENCY*/}
                            <Typography>BRL</Typography>
                            {/*<Typography>{transaction.currency.symbol}</Typography>*/}
                        </Grid2>

                    </Grid2>
                </Paper>
            </Box>


            <Paper variant={"outlined"}>
                <Box>
                    <Typography variant={"h3"} sx={{mb: 4}}>Attachments</Typography>

                    <List sx={{display: "flex", justifyContent: "start", gap: 3}}>
                        <ListItem sx={{
                            flex: 1,
                            maxWidth: "25%",
                            minWidth: "200px",
                            border: `2px solid ${blue[600]}`,
                            borderRadius: 2
                        }}>
                            <DescriptionOutlined sx={{fontSize: "48px"}} color={"primary"}/>
                            <Typography color={"primary"}>
                                File name
                            </Typography>
                        </ListItem>

                        {/*//TODO: CREATE THE STYLE TO CONFIG HOVER FOR THAT*/}
                        <ListItemButton sx={{
                            maxWidth: "200px",
                            border: `4px dashed ${grey[300]}`,
                            color: grey[300],
                            paddingY: "16px",
                            m: 0
                        }}>
                            <UploadFile sx={{fontSize: "48px"}}/>
                            <Typography>
                                Add new attachment
                            </Typography>
                        </ListItemButton>
                    </List>
                </Box>
            </Paper>

            <Divider/>

            <Box variant={"outlined"}>
                <Typography variant={"h3"}>Logs</Typography>

                <List>
                    <ListItem>
                        <Typography variant={"body1"}>
                            Jaca element
                        </Typography>
                    </ListItem>
                </List>
            </Box>


        </Container>
    )

}
