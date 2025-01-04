import {createTheme, ThemeProvider} from "@mui/material";
import {LayoutMenuAppbar} from "@/layouts/main/LayoutMenuAppbar.jsx";

function App() {

    return (
        <ThemeProvider theme={theme}>
            <LayoutMenuAppbar />
        </ThemeProvider>
    )
}

const theme = createTheme({
   
})

export default App
