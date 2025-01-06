export const paymentMethodsRoutesList = [
    {
        path: "",
        element: <div>All payments</div>,
        label: "Dashboard trasactions",
        isInMenu: true,
        isEnabled: true,
    },
    {path: ":id/details", element: <div>Details</div>, label: "Details", isInMenu: false, isEnabled: true},
]

