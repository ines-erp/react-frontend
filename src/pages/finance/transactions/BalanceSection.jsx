import {Box, Card, CardContent, Chip, Typography} from "@mui/material";
import {MonetizationOnOutlined} from "@mui/icons-material";
import {green} from "@mui/material/colors";

export const BalanceSection = ({balance, totalIncomes, totalOutcomes}) => {
    return (<Box sx={{display: "flex", gap: "24px", mb: 4, mt: 2}}>
        <Card sx={{border: "none", borderRadius: 4, flex: 1, maxWidth: "240px"}} variant={"outlined"}>
            <CardContent>
                <Typography variant={"h3"} sx={{
                    alignItems: "center",
                    color: 'text.secondary',
                    display: "flex",
                    fontSize: 14,
                    gap: "8px",
                    mb: "16px"
                }}>
                    <MonetizationOnOutlined/>
                    Incomes
                </Typography>

                <Typography gutterBottom variant="h5" component="div">
                    {balance.symbol} {totalIncomes.toFixed(2)} <Chip label="12.8%" color="success"
                                                                     size="small"></Chip>
                </Typography>

                <Typography variant="caption">
                    <Typography variant="string" fontWeight="bold" color="success">+ R$ 30,00</Typography> than
                    last month
                </Typography>
            </CardContent>
        </Card>

        <Card sx={{border: "none", borderRadius: 4, flex: 1, maxWidth: "240px"}} variant={"outlined"}>
            <CardContent>
                <Typography variant={"h3"} sx={{
                    alignItems: "center",
                    color: 'text.secondary',
                    display: "flex",
                    fontSize: 14,
                    gap: "8px",
                    mb: "16px"
                }}>
                    <MonetizationOnOutlined/>
                    Outcomes
                </Typography>

                <Typography gutterBottom variant="h5" component="div">
                    {balance.symbol} {totalOutcomes.toFixed(2)} <Chip label="12.8%" color="warning"
                                                                      size="small"></Chip>
                </Typography>

                <Typography variant="caption">
                    <Typography variant="string" fontWeight="bold" color="warning">- R$ 10,00</Typography> than
                    last month
                </Typography>
            </CardContent>
        </Card>

        <Card sx={{background: green[50], border: "none", borderRadius: 4, flex: 1, maxWidth: "240px"}}
              variant={"outlined"}>
            <CardContent>
                <Typography variant={"h3"} sx={{
                    alignItems: "center",
                    color: 'text.secondary',
                    display: "flex",
                    fontSize: 14,
                    gap: "8px",
                    mb: "16px"
                }}>
                    <MonetizationOnOutlined/>
                    Balance
                </Typography>

                <Typography gutterBottom variant="h5" component="div">
                    {balance.symbol} {balance.amount} <Chip label="12.8%" color="success" size="small"></Chip>
                </Typography>

                <Typography variant="caption">
                    <Typography variant="string" fontWeight="bold" color="success">+ R$ 20,00</Typography> than
                    last month
                </Typography>
            </CardContent>

        </Card>
    </Box>)
}