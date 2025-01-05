import {Box, Card, CardContent, Chip, Container, Typography} from "@mui/material";
import {MonetizationOnOutlined} from "@mui/icons-material";
import {green, grey} from "@mui/material/colors"

export const TransactionsDashboard = () => {
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

            <div>statistics</div>

            <div>Latest transactions</div>

        </Container>
    )

}