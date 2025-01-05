import {Box, Button, ButtonGroup, Card, CardContent, Chip, Container, Typography} from "@mui/material";
import {MonetizationOnOutlined} from "@mui/icons-material";
import {green} from "@mui/material/colors"
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {inesDataApiV1} from "@/api/inesDataApiV1.js";

export const TransactionsDashboard = () => {

    const [transactions, setStransactions] = useState([])


    useEffect(() => {
        inesDataApiV1.get("Transactions")
            .then(res => setStransactions(res.data));
    }, [])

    return (
        <Container maxWidth={false}>
            <Typography variant={"h1"} gutterBottom fontSize={"3rem"}>Transactions</Typography>

            <Box sx={{display: "flex", gap: "24px", mb: "32px"}}>
                <Card sx={{maxWidth: "240px", flex: 1, borderRadius: 4, border: "none"}} variant={"outlined"}>
                    <CardContent>
                        <Typography variant={"h3"} sx={{
                            color: 'text.secondary',
                            fontSize: 14,
                            alignItems: "center",
                            display: "flex",
                            gap: "8px",
                            mb: "16px"
                        }}>
                            <MonetizationOnOutlined/>
                            Incomes
                        </Typography>

                        <Typography gutterBottom variant="h5" component="div">
                            R$ 100,00 <Chip label="12.8%" color="success" size="small"></Chip>
                        </Typography>

                        <Typography variant="caption">
                            <Typography variant="string" fontWeight="bold" color="success">+ R$ 30,00</Typography> than
                            last month
                        </Typography>
                    </CardContent>
                </Card>

                <Card sx={{maxWidth: "240px", flex: 1, borderRadius: 4, border: "none"}} variant={"outlined"}>
                    <CardContent>
                        <Typography variant={"h3"} sx={{
                            color: 'text.secondary',
                            fontSize: 14,
                            alignItems: "center",
                            display: "flex",
                            gap: "8px",
                            mb: "16px"
                        }}>
                            <MonetizationOnOutlined/>
                            Outcomes
                        </Typography>

                        <Typography gutterBottom variant="h5" component="div">
                            -R$ 30,00 <Chip label="12.8%" color="warning" size="small"></Chip>
                        </Typography>

                        <Typography variant="caption">
                            <Typography variant="string" fontWeight="bold" color="warning">- R$ 10,00</Typography> than
                            last month
                        </Typography>
                    </CardContent>
                </Card>

                <Card sx={{maxWidth: "240px", flex: 1, borderRadius: 4, background: green[50], border: "none"}}
                      variant={"outlined"}>
                    <CardContent>
                        <Typography variant={"h3"} sx={{
                            color: 'text.secondary',
                            fontSize: 14,
                            alignItems: "center",
                            display: "flex",
                            gap: "8px",
                            mb: "16px"
                        }}>
                            <MonetizationOnOutlined/>
                            Balance
                        </Typography>

                        <Typography gutterBottom variant="h5" component="div">
                            R$ 70,00 <Chip label="12.8%" color="success" size="small"></Chip>
                        </Typography>

                        <Typography variant="caption">
                            <Typography variant="string" fontWeight="bold" color="success">+ R$ 20,00</Typography> than
                            last month
                        </Typography>
                    </CardContent>

                </Card>
            </Box>

            <Box sx={{display: "flex", gap: "24px"}}>
                <Card sx={{maxWidth: "60%", flex: 1, minHeight: "350px", border: "none"}} variant={"outlined"}>Chart
                    one</Card>
                <Card sx={{maxWidth: "40%", flex: 1, minHeight: "350px", border: "none"}} variant={"outlined"}>Chart
                    one</Card>
            </Box>

            <Box sx={{
                background: "#fff",
                padding: "32px",
                mt: "32px",
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                gap: "24px"
            }}>
                <Box sx={{display: "flex", justifyContent: "space-between"}}>
                    <Typography variant={"h2"} fontSize={"1.5rem"}>Latests Transactions</Typography>
                    <ButtonGroup>
                        <Button variant={"contained"}>All</Button>
                        <Button>Incomes</Button>
                        <Button>Outcomes</Button>
                    </ButtonGroup>
                </Box>

                <Box sx={{display: "flex", gap: "16px", flexDirection: "column"}}>
                    {transactions.map(transaction => {
                        return (
                            <Card variant={"outlined"}>
                                <CardContent
                                    sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                    <Typography variant={"h3"} fontSize={"1rem"}>{transaction.name}</Typography>
                                    <Typography>{transaction.transactionType.name}</Typography>
                                    <Typography>{transaction.description}</Typography>

                                    <Box sx={{display: "flex", gap: "8px", alignItems: "center", my: "auto"}}>
                                        <Button as={Link} variant={"outlined"} to={`details/${transaction.id}`}>Details</Button>
                                        <Button componet={Link} variant={"outlined"} color={"error"}>Delete</Button>
                                    </Box>
                                </CardContent>
                                <Box></Box>
                            </Card>
                        )
                    })}
                </Box>
            </Box>

        </Container>
    )

}