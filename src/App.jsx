import {RouterProvider} from "react-router-dom";
import router from "@/routes/router.jsx"
import {ThemeProvider} from "@mui/material";
import {inesMainTheme} from "@/themes/inesMainTheme.js";

function App() {

    return (
        <ThemeProvider theme={inesMainTheme}>
            <RouterProvider router={router}/>
        </ThemeProvider>
    )
}


export default App
