import {inesMainTheme} from "@/themes/inesMainTheme.js";
import router from "@/routes/router.jsx";
import {RouterProvider} from "react-router-dom";
import {ThemeProvider} from "@mui/material";

function App() {

    return (
        <ThemeProvider theme={inesMainTheme}>
            <RouterProvider router={router}/>
        </ThemeProvider>
    );
}


export default App;
