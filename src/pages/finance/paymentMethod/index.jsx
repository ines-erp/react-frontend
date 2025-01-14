import {
    Box,
    Button, ButtonGroup,
    Card,
    CardContent,
    Container,
    FormControl, InputLabel, MenuItem,
    Pagination, Paper, Select,
    Stack,
    Typography
} from "@mui/material";
import {Add, CreditCard, LocalAtm} from "@mui/icons-material";
import {useEffect, useState} from "react";
import {EmptyState} from "@/components/ui/EmptyState.jsx";
import {DeleteFromApiData, getFromApiData, PostToApiData, putToApiData} from "@/api/inesDataApiV1.js";
import {ActionModalPM} from "@/pages/finance/paymentMethod/ActionModalPM.jsx";
import {PaymentMethodsCard} from "@/pages/finance/paymentMethod/PaymentMethodsCard.jsx";
import {Badge} from "@/components/base/Badge.jsx";
import {Breadcrumbs} from "@/components/base/Breadcrumbs.jsx";
import {PageHeader} from "@/components/base/PageHeader.jsx";

//TODO: add the skeleton
//TODO: Add filters when the endpoint is able to it
// TODO: last used payment methods on transactions when endpoint is filtering by date

export const PaymentMethodDashboard = () => {
    const [paymentMethods, setPaymentMethods] = useState([])
    const [filters, setFilters] = useState({
        type: undefined,
        name: undefined,
        currencyCode: undefined,
    })

    const lastPaymentMethods = paymentMethods.length > 0 ? paymentMethods.slice(0, 3) : undefined;

    const currenciesAvailable = paymentMethods.length > 0 ? paymentMethods.map(pm => pm.currency) : undefined;
    const currenciesOnPm = currenciesAvailable && currenciesAvailable.length > 0 ? currenciesAvailable.map(pm => pm.isoCode).filter((value, index, array) => array.indexOf(value) === index) : undefined;

    const typesOfPm = paymentMethods.length > 0 ? paymentMethods.map(pm => pm.type).filter((value, index, array) => array.indexOf(value) === index) : undefined;

    const getPaymentMethods = async () => {
        const data = await getFromApiData(`paymentmethods`);
        const formatted = data.map((item) => {
            const createdDate = item.createdAt && new Date(item.createdAt).toDateString()
            return {
                ...item,
                createdAt: createdDate
            }
        })
        setPaymentMethods(formatted);
    }

    const handleUpdate = async (data) => {
        try {
            await putToApiData(`paymentmethods/${data.id}`, data)
            await getPaymentMethods();
        } catch (error) {
            console.error(error)
        }
    }

    const handleCreatePaymentMethod = async (data) => {
        try {
            await PostToApiData("paymentmethods", data);
            await getPaymentMethods();
        } catch (e) {

        }
    }

    const handleDeletePaymentMethod = async (id) => {
        try {
            await DeleteFromApiData(`paymentmethods/${id}`)
            await getPaymentMethods();
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        getPaymentMethods();
    }, [])

    return (
        <Container>
            <PageHeader
                title="payment methods"
                actionButton={
                    <ActionModalPM type="create" size="medium" onSave={handleCreatePaymentMethod}/>
                }
            />

            {currenciesOnPm && (
                <Box sx={{display: "flex", gap: 1, alignItems: "center"}}>
                    <Badge label="All"
                           isSelected={filters.currencyCode === undefined}
                           onClick={() => {
                               setFilters((prev) => {
                                   return {
                                       ...prev,
                                       currencyCode: undefined,
                                   }
                               })
                           }}/>
                    {currenciesOnPm.map((currency) => {
                        const data = currenciesAvailable.find(c => c.isoCode === currency);
                        return (
                            <Badge key={data.symbol}
                                   label={`${data.symbol} - ${data.name}`}
                                   isSelected={filters.currencyCode === data.isoCode}
                                   onClick={() => {
                                       setFilters((prev) => {
                                           return {
                                               ...prev,
                                               currencyCode: data.isoCode,
                                           }
                                       })
                                   }}/>
                        )
                    })}
                </Box>
            )}

            {paymentMethods.length === 0 && <EmptyState>
                <Box sx={{display: "flex", flexDirection: "column", gap: 1, alignItems: "center"}}>
                    {Object.values(filters) && <Typography>Try adjust your search</Typography>}

                    {Object.values(filters) === undefined && <>
                        <Typography>Start by adding one payment method</Typography>
                        <Button onClick={() => {
                            console.log("not implemented")
                        }} variant="contained" startIcon={<Add/>}>Add new</Button>
                    </>}
                </Box>
            </EmptyState>}


            {lastPaymentMethods && lastPaymentMethods.length > 0 &&
                <Box>
                    <Typography variant={"h2"} fontSize={"1.5rem"}>Last used</Typography>
                    <Box sx={{display: "flex", gap: "24px", mb: 4, mt: 2}}>
                        {lastPaymentMethods.map(pm => {
                            return (
                                <Card sx={{maxWidth: "240px", flex: 1}} variant={"filled"}>
                                    <CardContent>
                                        <Typography variant={"h3"} sx={{
                                            color: 'text.secondary',
                                            fontSize: 14,
                                            alignItems: "center",
                                            display: "flex",
                                            gap: "8px",
                                            mb: "16px"
                                        }}>
                                            {pm.type.toLowerCase().includes("card") ? <CreditCard/> : <LocalAtm/>}
                                            {pm.type}
                                        </Typography>

                                        <Typography variant="caption" color={"text.secondary"}>
                                            {pm.currency.symbol} - {pm.currency.name}
                                        </Typography>
                                        <Typography gutterBottom variant={"h3"} component="div">
                                            {pm.name}
                                        </Typography>

                                        <Typography variant="caption" color={"text.secondary"}>
                                            Used on - 01/01/1970
                                        </Typography>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </Box>
                </Box>
            }

            {paymentMethods.length > 0 && (
                <Paper variant="outlined">

                    <Box sx={{display: "flex", justifyContent: "space-between"}}>
                        <Typography variant={"h2"} fontSize={"1.5rem"}>Payment methods</Typography>
                        <ButtonGroup>
                            <Button
                                variant={filters.type === undefined ? "contained" : "outlined"}
                                onClick={() => setFilters((prev) => {
                                    return {
                                        ...prev,
                                        type: undefined
                                    }
                                })}>
                                All
                            </Button>
                            {typesOfPm && typesOfPm.map(
                                type => {
                                    return (
                                        <Button
                                            key={type}
                                            variant={filters.type === type ? "contained" : "outlined"}
                                            onClick={() => setFilters((prev) => {
                                                return {
                                                    ...prev,
                                                    type: type
                                                }
                                            })}>
                                            {type}
                                        </Button>
                                    )
                                }
                            )}
                        </ButtonGroup>
                    </Box>

                    {paymentMethods.map((paymentMethod) => {
                        return (
                            <PaymentMethodsCard
                                key={paymentMethod.id}
                                paymentMethod={paymentMethod}
                                onUpdate={handleUpdate}
                                onDelete={handleDeletePaymentMethod}
                            />
                        )
                    })}

                    <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4}}>
                        <FormControl sx={{m: 1, minWidth: 120}} size="small">
                            <InputLabel id="perpage">Per page</InputLabel>
                            <Select variant="outlined" label="Per page" size="small"
                                    onChange={() => console.log("not implemented")}>
                                {Array.from([1, 2, 3, 4, 5], (x) => x * 10).map(option => {
                                    if (option < 1) return null;
                                    return <MenuItem key={option} value={option}>{option}</MenuItem>;
                                })}
                            </Select>
                        </FormControl>
                        <Pagination count={10} shape="rounded" color="primary"/>
                    </Box>

                </Paper>
            )}
        </Container>
    )
}



