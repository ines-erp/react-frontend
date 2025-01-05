import {BiUser} from "react-icons/bi";
import {TransactionsDashboard} from "@/pages/finance/transactions/index.jsx";

export const transactionsRoutesList = [
    {path: "", element: <TransactionsDashboard />, label:"Dashboard trasactions", isInMenu: true, isEnabled: true, parentLabel:"Finance", icon:<BiUser />},
    {path: "add", element: <h1>Any other</h1>, label:"New transaction", isInMenu: false, isEnabled: false},
    {path: "details/{:id}", element: <h1>Transactions datails</h1>, label:"Details", isInMenu: false, isEnabled: true},
    {path: "delete/{:id}", element: <h1>Any other</h1>, label:"Delete transaction", isInMenu: false, isEnabled: false},
]