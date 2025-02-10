import {authRoutesRoutes} from "@/pages/auth/login/authRoutes.jsx";
import {financesRoutes} from "@/pages/finance/financeRoutes.jsx";
import {homeRoutes} from "@/pages/home/homeRoutes.jsx";

// TODO: check the user claims on the api and make the routes available accordingly to them
//Example idea
const claims = ["hr_w", "hr_r", "fin_r"];

export const modulesRoutes = {
    auth: authRoutesRoutes[0],
    home: homeRoutes[0],
    finance: claims.includes("fin_r") && financesRoutes[0]
}
