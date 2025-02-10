import {Outlet} from "react-router-dom";
import {BiUser} from "react-icons/bi";
import {FinancesDashboard} from "@/pages/finance/index.jsx";
import {transactionsRoutesList} from "@/pages/finance/transactions/transactionsRoutes.jsx";
import {paymentMethodsRoutesList} from "@/pages/finance/paymentMethod/paymentMethodsRoutes.jsx";
import {LayoutMenuAppbar} from "@/layouts/main/LayoutMenuAppbar.jsx";
import {transactionCategoryRoutesList} from "@/pages/finance/transactions/category/transactionCategoryRoutesList.jsx";
import {transactionTypesRoutesList} from "@/pages/finance/transactions/types/transactionTypesRoutesList.jsx";

export const financesRoutesList = [
    {
        children: [{isEnabled: true, isInMenu: true, element: <FinancesDashboard/>, path:""}],
        element: <Outlet/>,
        isEnabled: true,
        isInMenu: true,
        label: "Dashboard",
        path: "",
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
];

export const financesRoutes = [
    {
        children: financesRoutesList.filter(item => item.isEnabled === true),
        element: <LayoutMenuAppbar/>,
        path: "/finance"
    }
];