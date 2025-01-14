import {createTheme, ThemeProvider} from "@mui/material";
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
                {props: {variant: "h1"}, style: {fontSize: '2.4rem', fontWeight: 500}},
                {props: {variant: "h2"}, style: {fontSize: '2.0rem', fontWeight: 400}},
                {props: {variant: "h3"}, style: {fontSize: '1.6rem', fontWeight: 300}},
                {props: {variant: "h4"}, style: {fontSize: '1.2rem', fontWeight: 300}},
                {props: {variant: "h5"}, style: {fontSize: '0.8rem', fontWeight: 100}},
                {props: {variant: "h6"}, style: {fontSize: '0.6rem', fontWeight: 100}},
            ]
        },
        MuiPaper: {
            variants: [
                {
                    props: {variant: 'outlined'},
                    style: {
                        borderRadius: "8px",
                        padding: "16px",
                        border: "none",
                    },
                },
            ],
        },
        MuiCard:{
            variants:[
                {
                    props: {variant:'outlined'},
                    style: {
                        borderRadius: "8px",
                        padding: "16px",
                        border: `1px solid ${grey[300]}`,
                    }
                }
            ]
        },
        MuiContainer: {
            styleOverrides: {
                root: {
                    marginLeft: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px"
                }
            }
        }
    },
})

