import {homeRoutes} from "@/pages/home/homeRoutes.jsx";
import {financesRoutes} from "@/pages/finance/financeRoutes.jsx";
import {authRoutesRoutes} from "@/pages/auth/login/authRoutes.jsx";


/**
 * Receives a list os routes from react router and return as array
 */
export const menuRoutes = [
    ...authRoutesRoutes,
    ...homeRoutes,
    ...financesRoutes
];
