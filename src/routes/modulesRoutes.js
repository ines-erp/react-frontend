import {authRoutesRoutes} from "@/pages/auth/login/authRoutes.jsx";
import {financesRoutes} from "@/pages/finance/financeRoutes.jsx";
import {homeRoutes} from "@/pages/home/homeRoutes.jsx";

export const modulesRoutes = {
    auth: authRoutesRoutes[0],
    home: homeRoutes[0],
    finance: financesRoutes[0]
}
