import {Box, Button, Card, CardActions, CardContent, Chip, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {green, orange} from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";

export const TransactionCardResume = ({transaction, onDelete}) => {
    const {
        id, name, description, amount, date, createdAt, updatedAt, paidBy, receivedBy
    } = transaction;

    const {id: transactionTypeId, name: transactionTypeName} = transaction.transactionType

    const {id: categoryId, name: categoryName} = transaction.transactionCategory

    const {
        id: paymentMethodId,
        type: paymentMethodType,
        name: paymentMethodName,
        description: paymentMethodDescription,
        createdAt: paymentMethodCreatedAt,
        updatedAt: paymentMethodUpdatedAt
    } = transaction.paymentMethod

    const {
        id: currencyId, name: currencyName, symbol: currencySymbol, isoCode: currencyIsoCode
    } = transaction.paymentMethod.currency


    return (<Card
            variant="outlined"
            key={transaction.id}
            sx={{background: transaction.transactionType.name.toLowerCase() === "income" ? green[50] : orange[50]}}
        >

            <CardContent>
                <Box sx={{display: "flex", gap: 2, alignItems: "center"}}>
                    <Chip variant="outlined" label={transactionTypeName}/>
                    <Typography variant="h3">
                        {currencySymbol} {amount.toFixed(2)}
                    </Typography>
                </Box>

                <Typography variant="h3">
                    {name}
                </Typography>

                <Typography variant="body1">
                    {description.substring(0, 30) + "..."}
                </Typography>
            </CardContent>

            <CardActions>
                <Button
                    as={Link}
                    style={{textDecoration: "none"}}
                    variant="outlined"
                    to={`${id}/details`}
                >
                    Details
                </Button>

                <Button variant="outlined" size="medium" color="error" startIcon={<DeleteIcon/>}
                        onClick={onDelete}
                >
                    Delete
                </Button>
            </CardActions>
        </Card>)
}