import {BiUser} from "react-icons/bi";
import {TransactionsDashboard} from "@/pages/finance/transactions/index.jsx";
import {TransactionsDetails} from "@/pages/finance/transactions/details.jsx";

export const transactionsRoutesList = [
    {
        element: <TransactionsDashboard/>,
        icon: <BiUser/>,
        isEnabled: true,
        isInMenu: true,
        label: "Dashboard trasactions",
        parentLabel: "Finance",
        path: ""
    },
    {element: <h1>Any other</h1>, isEnabled: false, isInMenu: false, label: "New transaction", path: "add"},
    {element: <TransactionsDetails/>, isEnabled: true, isInMenu: false, label: "Details", path: ":id/details"},
    {element: <h1>Any other</h1>, isEnabled: false, isInMenu: false, label: "Delete transaction", path: ":id/delete"},
];