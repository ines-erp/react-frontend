import {Box, InputAdornment, ListItemIcon, Menu, MenuItem, TextField, Typography} from "@mui/material";
import {
    AccountBalance, ArrowDownward, ArrowUpward,
    CreditCard,
    Info,
    LocalAtm, Sort
} from "@mui/icons-material";
import React, {useEffect, useState} from "react";

import {DeleteFromApiData, getFromApiData, PostToApiData, putToApiData} from "@/api/inesDataApiV1.js";
import {ActionModalPM} from "@/pages/finance/paymentMethod/ActionModalPM.jsx";
import {PaymentMethodsCard} from "@/pages/finance/paymentMethod/PaymentMethodsCard.jsx";

import {LayoutDataViewList} from "@/layouts/inner/LayoutDataViewList.jsx";
import {SummaryCard} from "@/components/base/SummaryCard.jsx";
import {Filters} from "@/components/ui/Filters.jsx";
import {SortBy} from "@/components/ui/SortBy.jsx";
import {useLocation} from "react-router-dom";

// TODO: Add pagination
// FIX: Fix the filter badge applied
// TODO: last used payment methods on transactions when endpoint is filtering by date

export const PaymentMethodDashboard = () => {
    const location = useLocation()
    const searchParams = location.search;

    const [paymentMethods, setPaymentMethods] = useState(undefined)
    const lastPaymentMethods = paymentMethods && paymentMethods.length > 0 ? paymentMethods.slice(0, 3) : undefined;

    const availableCurrencies = [
        {value: "USD", label: "Dollar"},
        {value: "EUR", label: "Euro"},
        {value: "BRL", label: "Real"},
    ]

    const sortOptions = [
        {value: "currency", label: "Currency"},
        {value: "name", label: "Name"},
        {value: "type", label: "Type"},
        {value: "createdAt", label: "Created At"},
    ]

    const getPaymentMethods = async () => {

        // //TODO: After the PR of wes be merged, redo this function to receive axios params.
        const data = await getFromApiData(`paymentmethods${searchParams}`);
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

    const renderIconCards = (type) => {
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

    // TODO: request this filters from the api
    const filterListOptions = [

        {
            label: "Currency", type: "buttons", field: "currency", options: availableCurrencies
        },
        {
            label: "Type", type: "textField", field: "type"
        },
        {
            label: "Name", type: "textField", field: "name",
        },
        {
            label: "Fruta", type: "textField", field: "jacare",
        },
    ]

    const handleOptionsFilterView = () => {
        if (availableCurrencies) {
            const options = availableCurrencies.map((item) => {
                return {label: item.label, value: item.value}
            })
            options.push({label: "All", value: undefined})

            return options
        }
        return undefined
    }

    const dataHeader = {
        title: "payment methods",
        actionButton:
            <ActionModalPM
                type="create"
                size="medium"
                onSave={handleCreatePaymentMethod}/>
    }

    const dataFilterView = {
        isVisible: true,
        field: "currency",
        onClick: (value) => {
            console.log(value)

        },
        options: handleOptionsFilterView()
    }

    const dataSummaryCards = {
        isVisible: true,
        title: "Last used",
        limit: 3,
        children:
            lastPaymentMethods && lastPaymentMethods.map(pm =>
                React.createElement(SummaryCard,
                    {
                        key: pm.id,
                        children: <Typography variant="h3">{pm.name}</Typography>,
                        header: {
                            title: pm.type,
                            icon: renderIconCards(pm.type)
                        },
                        caption: pm.createdAt
                    })
            )
    }

    const dataList = {
        title: "All Payment methods",
        totalPages: 10,
        actionButtons: <Box sx={{display: "flex", gap: 1}}>
            <SortBy
                sortOptions={sortOptions}
            />
            <Filters
                filterOptions={filterListOptions}
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
    }

    useEffect(() => {
        setTimeout(() => {
            getPaymentMethods();
        }, "1000")
    }, [searchParams])

    return (
        <LayoutDataViewList
            header={dataHeader}
            filterView={dataFilterView}
            dataSummary={dataSummaryCards}
            dataList={dataList}
        />
    )
}



