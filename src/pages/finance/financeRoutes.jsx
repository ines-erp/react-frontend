import {Outlet} from "react-router-dom";
import {BiUser} from "react-icons/bi";
import {FinancesDashboard} from "@/pages/finance/index.jsx";
import {transactionsRoutesList} from "@/pages/finance/transactions/transactionsRoutes.jsx";
import {paymentMethodsRoutesList} from "@/pages/finance/paymentMethod/paymentMethodsRoutes.jsx"

export const financesRoutesList = [
    {
        path: "",
        element: <FinancesDashboard/>,
        label: "Dashboard",
        isInMenu: true,
        isEnabled: true,
        parentLabel: "Finance",
        icon: <BiUser/>
    },
    {
        path: "transactions", element: <Outlet/>, label: "Transactions", isInMenu: true, isEnabled: true,
        children: transactionsRoutesList.filter(item => item.isEnabled === true)
    },
    {
        path:"paymentmethods", element: <Outlet/>, label: "Payment methods", isInMenu: true, isEnabled: true,
        children: paymentMethodsRoutesList.filter(item => item.isEnabled === true)
    }
]

export const financesRoutes = [
    {
        path: "/finance",
        element: <Outlet/>,
        children: financesRoutesList.filter(item => item.isEnabled === true)
    }
]