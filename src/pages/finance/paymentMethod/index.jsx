import {Box,  Typography} from "@mui/material";
import {
    AccountBalance,
    CreditCard,
    Info,
    LocalAtm,
} from "@mui/icons-material";
import React, {useEffect, useState} from "react";

import {deleteFromApiData, getFromApiData, postToApiData, putToApiData} from "@/api/inesDataApiV1.js";
import {ActionModalPM} from "@/pages/finance/paymentMethod/ActionModalPM.jsx";
import {PaymentMethodsCard} from "@/pages/finance/paymentMethod/PaymentMethodsCard.jsx";

import {LayoutDataViewList} from "@/layouts/inner/LayoutDataViewList.jsx";
import {SummaryCard} from "@/components/base/SummaryCard.jsx";
import {Filters} from "@/components/ui/Filters.jsx";
import {SortBy} from "@/components/ui/SortBy.jsx";
import {useSearchParams} from "react-router-dom";

// TODO: Add pagination
// TODO: last used payment methods on transactions when endpoint is filtering by date

export const PaymentMethodDashboard = () => {

    const [currentQueryParams, setCurrentQueryParams] = useSearchParams();
    const searchParams = Object.fromEntries([...currentQueryParams]);

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

        const data = await getFromApiData(`paymentmethods`, searchParams);
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
            await postToApiData("paymentmethods", data);
            await getPaymentMethods();
        } catch (e) {

        }
    }

    const handleDeletePaymentMethod = async (id) => {
        try {
            await deleteFromApiData(`paymentmethods/${id}`)
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
            options.push({label: "All", value: ''})

            return options
        }
        return undefined
    }

    const dataHeader = {
        title: "payment methods",
        breadcrumbs:{previous:[{label:"Finance", path:"/finance"}], current:"Payment methods"},
        actionButton:
            <ActionModalPM
                type="create"
                size="medium"
                onSave={handleCreatePaymentMethod}/>
    }

    const badgeFilters = {
        isVisible: true,
        field: searchParams.currency,
        onClick: (value) => {
            searchParams.currency = value
            setCurrentQueryParams(searchParams);
        },
        options: handleOptionsFilterView()
    }

    const dataMiddleSection = {
        isVisible: true,
        title: "Last used",
        limit: 3,
        content:
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
        actions: <Box sx={{display: "flex", gap: 1, width:"100%", justifyContent:"flex-end"}}>
            <SortBy
                sortOptions={sortOptions}
                currentQueryParams={currentQueryParams}
                setCurrentQueryParams={setCurrentQueryParams}
            />
            <Filters
                currentQueryParams={currentQueryParams} setCurrentQueryParams={setCurrentQueryParams}
                filterOptions={filterListOptions}
            />
        </Box>,

        items: !paymentMethods ? undefined : paymentMethods.map((paymentMethod) => {
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
            getPaymentMethods();
    }, [currentQueryParams])

    return (
        <LayoutDataViewList
            header={dataHeader}
            badgeFilters={badgeFilters}
            middleSection={dataMiddleSection}
            dataList={dataList}
        />
    )
}



