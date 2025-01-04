import {homeRoutes} from "@/pages/home/homeRoutes.jsx";
import {otherRoutes} from "@/pages/otherModule/otherModuleRoutes.jsx";


/**
 * Receives a list os routes from react router and return as array
 */
export const menuRoutes = [
        ...homeRoutes,
    ...otherRoutes
    ]
