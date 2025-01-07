import {createTheme} from "@mui/material";
import {blue, blueGrey, green, grey} from "@mui/material/colors";

export const inesMainTheme = createTheme({
    cssVariables: true,
    palette: {
        primary: {
            main: blue[600],
        },
        secondary: {
            main: green[100],
        },
    },
    spacing: Array.from({length: 10}, (_, idx) => (++idx - 1) * 8),
    borderRadius: 8,
    components: {
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    margin: 8,
                    borderRadius: 8,
                }
            }
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    fontSize: "1rem",
                },
            },
            variants: [
                {props: {variant: "h1"}, style: {color: "red"}},
                {props: {variant: "h2"}, style: {color: "purple"}}
            ]
        }
    },
})

