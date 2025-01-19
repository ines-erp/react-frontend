import {inesMainTheme} from "@/themes/inesMainTheme.js";
import router from "@/routes/router.jsx";
import {RouterProvider} from "react-router-dom";
import {ThemeProvider} from "@mui/material";
import {AuthContext, AuthDispatchContext} from "@/store/authContext.js";
import {useReducer} from "react";
import {getLoginToken} from "@/pages/auth/login/index.jsx";

const initialAuth = {token: getLoginToken(), username: null};

const authReducer = (auth, action) => {
    switch (action.type) {
        case "login":
            return {token: action.auth.token, username: action.auth.username};
        case "logout":
            return {...auth, token: null};
        default:
            throw Error("please login");
    }
};

function App() {

    const [auth, dispatch] = useReducer(authReducer, initialAuth);

    return (
        <ThemeProvider theme={inesMainTheme}>
            <AuthContext.Provider value={auth}>
                <AuthDispatchContext.Provider value={dispatch}>
                    <RouterProvider router={router}/>
                </AuthDispatchContext.Provider>
            </AuthContext.Provider>

        </ThemeProvider>
    );
}


export default App;
