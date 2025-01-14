import {createTheme, ThemeProvider} from "@mui/material";
import {blue, blueGrey, green, grey, red} from "@mui/material/colors";

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
            },
        },
        MuiButton: {
            variants: [
                {
                    props: {variant: "outlined"}, style: {
                        backgroundColor: "#fff",
                    }
                },
            ]
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
                {props: {variant: "h5"}, style: {fontSize: '0.8rem', fontWeight: 400}},
                {props: {variant: "h6"}, style: {fontSize: '0.6rem', fontWeight: 400}},
                {props: {variant: "caption"}, style: {color: grey[600], fontWeight: 300}}
            ]
        },
        MuiPaper: {
            styleOverrides: {
                root: {}
            },
            variants: [
                {
                    props: {variant: 'outlined'},
                    style: {
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                        borderRadius: "8px",
                        padding: "32px",
                        border: "none",
                    },
                },
            ],
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: "8px",
                    padding: "12px",
                    gap: "4px",
                    flex: 1
                }
            },
            variants: [
                {
                    props: {variant: 'outlined'},
                    style: {
                        border: `1px solid ${grey[300]}`,
                    }
                },
                {
                    props: {variant: 'filled'},
                    style: {
                        border: "none"
                    }
                }
            ]
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px"
                }
            }
        },
        MuiCardActions: {
            styleOverrides: {
                root: {
                    justifyContent: "flex-end",
                }
            }
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

