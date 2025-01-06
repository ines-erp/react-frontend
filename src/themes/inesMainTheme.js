import {createTheme} from "@mui/material";
import {green, purple} from "@mui/material/colors";

export const inesMainTheme = createTheme({
    cssVariables: true,
    palette: {
        primary: {
            main: purple[500],
        },
        secondary: {
            main: green[500],
        },
    },
    spacing: Array.from({length:10},(_, idx) => (++idx-1)*8),
    borderRadius: 8,
})