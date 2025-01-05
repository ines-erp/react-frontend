import {homeRoutes} from "@/pages/home/homeRoutes.jsx";
import {financesRoutes} from "@/pages/finance/financeRoutes.jsx";


/**
 * Receives a list os routes from react router and return as array
 */
export const menuRoutes = [
    ...homeRoutes,
    ...financesRoutes
]
