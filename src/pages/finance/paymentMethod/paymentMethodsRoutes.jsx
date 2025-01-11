import {PaymentMethodDashboard} from "@/pages/finance/paymentMethod/index.jsx";

export const paymentMethodsRoutesList = [
    {
        path: "",
        element: <PaymentMethodDashboard />,
        label: "Dashboard",
        isInMenu: true,
        isEnabled: true,
    },
    {path: ":id/details", element: <div>Details</div>, label: "Details", isInMenu: false, isEnabled: true},
]

