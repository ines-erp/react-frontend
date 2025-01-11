import {BiUser} from "react-icons/bi";
import {TransactionsDashboard} from "@/pages/finance/transactions/index.jsx";
import {TransactionsDetails} from "@/pages/finance/transactions/details.jsx";

export const transactionsRoutesList = [
    {path: "", element: <TransactionsDashboard />, label:"Dashboard trasactions", isInMenu: true, isEnabled: true, parentLabel:"Finance", icon:<BiUser />},
    {path: "add", element: <h1>Any other</h1>, label:"New transaction", isInMenu: false, isEnabled: false},
    {path: ":id/details", element: <TransactionsDetails />, label:"Details", isInMenu: false, isEnabled: true},
    {path: ":id/delete", element: <h1>Any other</h1>, label:"Delete transaction", isInMenu: false, isEnabled: false},
]