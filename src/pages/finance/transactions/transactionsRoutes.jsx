import {BiUser} from "react-icons/bi";
import {TransactionsDashboard} from "@/pages/finance/transactions/index.jsx";
import {TransactionsDetails} from "@/pages/finance/transactions/details.jsx";
import {transactionTypesRoutesList} from "@/pages/finance/transactions/types/transactionTypesRoutesList.jsx";
import {Outlet} from "react-router-dom";
import {transactionCategoryRoutesList} from "@/pages/finance/transactions/category/transactionCategoryRoutesList.jsx";

export const transactionsRoutesList = [
    {
        element: <TransactionsDashboard/>,
        isEnabled: true,
        isInMenu: true,
        label: "Dashboard",
        parentLabel: "Finance",
        path: ""
    },
    {element: <TransactionsDetails/>, isEnabled: true, isInMenu: false, label: "Details", path: ":id/details"},
    {
        children: transactionTypesRoutesList.filter(item => item.isEnabled === true),
        element: <Outlet/>,
        isEnabled: true,
        isInMenu: true,
        label: "Transaction Types",
        path: "types"
    },
    {
        children: transactionCategoryRoutesList.filter(item => item.isEnabled === true),
        element: <Outlet/>,
        isEnabled: true,
        isInMenu: true,
        label: "Categories",
        path: "categories"
    },
];