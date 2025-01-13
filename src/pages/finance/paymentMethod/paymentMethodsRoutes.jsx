import {PaymentMethodDashboard} from "@/pages/finance/paymentMethod/index.jsx";

export const paymentMethodsRoutesList = [
    {
        element: <PaymentMethodDashboard/>,
        isEnabled: true,
        isInMenu: true,
        label: "Dashboard",
        path: "",
    },
    {element: <div>Details</div>, isEnabled: true, isInMenu: false, label: "Details", path: ":id/details"},
];

