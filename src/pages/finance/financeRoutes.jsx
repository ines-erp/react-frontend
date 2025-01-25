import {BiUser} from "react-icons/bi";
import {FinancesDashboard} from "@/pages/finance/index.jsx";
import {Outlet} from "react-router-dom";
import {paymentMethodsRoutesList} from "@/pages/finance/paymentMethod/paymentMethodsRoutes.jsx";
import {transactionsRoutesList} from "@/pages/finance/transactions/transactionsRoutes.jsx";
import {transactionCategoryRoutes} from "@/pages/finance/category/transactionCategoryRoutes.jsx";
import {transactionTypesRoutes} from "@/pages/finance/transactionTypes/transactionTypesRoutes.jsx";
import {LayoutMenuAppbar} from "@/layouts/main/LayoutMenuAppbar.jsx";

export const financesRoutesList = [
    {
        element: <FinancesDashboard/>,
        icon: <BiUser/>,
        isEnabled: true,
        isInMenu: true,
        label: "Dashboard",
        parentLabel: "Finance",
        path: ""
    },
    {
        children: transactionsRoutesList.filter(item => item.isEnabled === true),
        element: <Outlet/>,
        isEnabled: true,
        isInMenu: true,
        label: "Transactions",
        path: "transactions"
    },
    {
        children: paymentMethodsRoutesList.filter(item => item.isEnabled === true),
        element: <Outlet/>,
        isEnabled: true,
        isInMenu: true,
        label: "Payment methods",
        path: "payment-methods"
    },
    {
        children: transactionCategoryRoutes.filter(item => item.isEnabled === true),
        element: <Outlet/>,
        isEnabled: true,
        isInMenu: true,
        label: "Categories",
        path: "categories"
    },
    {
        children: transactionTypesRoutes.filter(item => item.isEnabled === true),
        element: <Outlet/>,
        isEnabled: true,
        isInMenu: true,
        label: "Transaction Types",
        path: "transaction-types"
    }
];

export const financesRoutes = [
    {
        children: financesRoutesList.filter(item => item.isEnabled === true),
        element: <LayoutMenuAppbar/>,
        path: "/finance"
    }
];