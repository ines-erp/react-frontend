import {FinancePage} from "@/pages/modules/finance/index.jsx";
import {LoginPage} from "@/pages/common/loginPage.jsx";
import {Route, Routes} from "react-router";
import {AppLayout} from "@/components/layout/appLayout.jsx";
import {AuthLayout} from "@/components/layout/authLayout.jsx";

function App() {

    return (
        <Routes>
            <Route element={<AuthLayout/>}>
                <Route path="/login" element={<LoginPage/>}/>
            </Route>
            <Route element={<AppLayout/>}>
                <Route path="/finance"  element={<FinancePage/>} />
            </Route>
        </Routes>
    )
}

export default App
