import {
    Box,
    Typography
} from "@mui/material";
import {AccountBalance, CreditCard, Info, LocalAtm} from "@mui/icons-material";
import React, {useEffect, useState} from "react";

import {DeleteFromApiData, getFromApiData, PostToApiData, putToApiData} from "@/api/inesDataApiV1.js";
import {ActionModalPM} from "@/pages/finance/paymentMethod/ActionModalPM.jsx";
import {PaymentMethodsCard} from "@/pages/finance/paymentMethod/PaymentMethodsCard.jsx";

import {LayoutDataViewList} from "@/layouts/inner/LayoutDataViewList.jsx";
import {SummaryCard} from "@/components/base/SummaryCard.jsx";
import {Filters} from "@/components/ui/Filters.jsx";

//TODO: add the skeleton
//TODO: Add filters when the endpoint is able to it
// TODO: last used payment methods on transactions when endpoint is filtering by date

export const PaymentMethodDashboard = () => {
    const [paymentMethods, setPaymentMethods] = useState(undefined)
    const [filters, setFilters] = useState({
        type: undefined,
        name: undefined,
        currencyCode: undefined,
    })

    const lastPaymentMethods = paymentMethods && paymentMethods.length > 0 ? paymentMethods.slice(0, 3) : undefined;

    const currenciesAvailable = paymentMethods && paymentMethods.length > 0 ? paymentMethods.map(pm => pm.currency) : undefined;
    const currenciesOnPm = currenciesAvailable && currenciesAvailable.length > 0 ? currenciesAvailable.map(pm => pm.isoCode).filter((value, index, array) => array.indexOf(value) === index) : undefined;

    const typesOfPm = paymentMethods && paymentMethods.length > 0 ? paymentMethods.map(pm => pm.type).filter((value, index, array) => array.indexOf(value) === index) : undefined;

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
        setTimeout(() => {
            getPaymentMethods();
        }, "3000")
    }, [])


    const RenderIconCards = (type) => {
        switch (true) {
            case type.toLowerCase().includes('card'):
                return <CreditCard/>;
            case type.toLowerCase().includes('cash'):
                return <LocalAtm/>;
            case type.toLowerCase().includes('bank'):
                return <AccountBalance/>;
            default:
                return <Info/>;
        }
    }

    const filterOptionsExample = [
        {
            label: "filter by currency", type: "buttons", field: "currencyCode", options: [
                {value: "USD", label: "Dollar"},
                {value: "EUR", label: "Euro"},
                {value: "BRL", label: "Real"},
            ]
        }
    ]
    const handleFilters = (field, value) => {
        setFilters((prevState) => {
            return {
                ...prevState,
                [field]: value
            }
        })
    }

    return (
        <LayoutDataViewList
            header={{
                title: "payment methods",
                actionButton:
                    <ActionModalPM
                        type="create"
                        size="medium"
                        onSave={handleCreatePaymentMethod}/>
            }}
            dataResume={{
                isVisible: true,
                title:"Last used",
                limit:4,
                children:
                    lastPaymentMethods && lastPaymentMethods.map(pm =>
                        React.createElement(SummaryCard,
                            {
                                key:pm.id,
                                children: <Typography variant="h3">{pm.name}</Typography>,
                                header: {
                                    title: pm.type,
                                    icon: RenderIconCards(pm.type)
                                },
                                caption: pm.createdAt
                            })
                    )
            }}
            dataList={{
                title: "All Payment methods",
                totalPages: 10,
                limit:4,
                actionButtons: <Box>
                    <Filters filterOptions={filterOptionsExample}
                             filters={filters}
                             onChangeFilters={handleFilters}
                    />
                </Box>,

                children: !paymentMethods ? undefined : paymentMethods.map((paymentMethod) => {
                    return (
                        <PaymentMethodsCard
                            key={paymentMethod.id}
                            paymentMethod={paymentMethod}
                            onUpdate={handleUpdate}
                            onDelete={handleDeletePaymentMethod}
                        />
                    )
                })
            }}

        />
        //     {currenciesOnPm && (
        //         <Box sx={{display: "flex", gap: 1, alignItems: "center"}}>
        //             <Badge label="All"
        //                    isSelected={filters.currencyCode === undefined}
        //                    onClick={() => {
        //                        setFilters((prev) => {
        //                            return {
        //                                ...prev,
        //                                currencyCode: undefined,
        //                            }
        //                        })
        //                    }}/>
        //             {currenciesOnPm.map((currency) => {
        //                 const data = currenciesAvailable.find(c => c.isoCode === currency);
        //                 return (
        //                     <Badge key={data.symbol}
        //                            label={`${data.symbol} - ${data.name}`}
        //                            isSelected={filters.currencyCode === data.isoCode}
        //                            onClick={() => {
        //                                setFilters((prev) => {
        //                                    return {
        //                                        ...prev,
        //                                        currencyCode: data.isoCode,
        //                                    }
        //                                })
        //                            }}/>
        //                 )
        //             })}
        //         </Box>
        //     )}

        //                 <ButtonGroup>
        //                     <Button
        //                         variant={filters.type === undefined ? "contained" : "outlined"}
        //                         onClick={() => setFilters((prev) => {
        //                             return {
        //                                 ...prev,
        //                                 type: undefined
        //                             }
        //                         })}>
        //                         All
        //                     </Button>
        //                     {typesOfPm && typesOfPm.map(
        //                         type => {
        //                             return (
        //                                 <Button
        //                                     key={type}
        //                                     variant={filters.type === type ? "contained" : "outlined"}
        //                                     onClick={() => setFilters((prev) => {
        //                                         return {
        //                                             ...prev,
        //                                             type: type
        //                                         }
        //                                     })}>
        //                                     {type}
        //                                 </Button>
        //                             )
        //                         }
        //                     )}
        //                 </ButtonGroup>

    )
}



