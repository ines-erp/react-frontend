import {Box, Button, Card, CardActions, CardContent, Chip, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {grey} from "@mui/material/colors";
import {Today} from "@mui/icons-material";

export const TransactionCardResume = ({transaction, onDelete}) => {
    const {
        id,
        name,
        description,
        amount,
        date,
        createdAt,
        updatedAt,
        paidBy,
        receivedBy
    } = transaction;

    const {id: transactionTypeId, name: transactionTypeName} = transaction.transactionType

    const {id: categoryId, name: categoryName} = transaction.transactionCategory

    const {
        id: pymentMethodId,
        type: pymentMethodType,
        name: pymentMethodName,
        description: pymentMethodDescription,
        createdAt: pymentMethodCreatedAt,
        updatedAt: pymentMethodUpdatedAt
    } = transaction.paymentMethod

    const {
        id: currencyId,
        name: currencyName,
        symbol: currencySymbol,
        isoCode: currencyIsoCode
    } = transaction.paymentMethod.currency


    return (
        <Card
            variant="outlined"
            key={transaction.id}
            sx={{background: transaction.transactionType.name.toLowerCase() === "income" ? "#00ff0009" : "#ff000009"}}
        >

            <CardContent>
                <Box sx={{display: "flex", gap: 2, alignItems: "center"}}>
                    <Chip variant="outlined" label={transactionTypeName}/>
                    <Typography variant="h4">
                        {currencySymbol}: {amount.toFixed(2)}
                    </Typography>
                </Box>
                <Typography variant="h3">{name}</Typography>
                <Typography>
                    {description.substring(0, 50) + "..."}
                </Typography>

                {createdAt &&
                    <Typography variant="body1" component="div"
                                sx={{
                                    display: "flex",
                                    gap: 2,
                                    alignItems: "center",
                                    color: grey[600]
                                }}
                    >
                        <Today color="inherit" fontSize="inherit"/>
                        {new Date(createdAt).toLocaleDateString()}
                    </Typography>
                }
            </CardContent>
            <CardActions>
                <Button
                    as={Link}
                    variant={"outlined"}
                    sx={{background: "#fff"}}
                    style={{textDecoration: "none"}}
                    to={`${id}/details`}
                >
                    Details
                </Button>

                <Button
                    componet={Link}
                    variant="outlined"
                    color="error"
                    sx={{background: "#fff"}}
                    onClick={onDelete}
                >
                    Delete
                </Button>
            </CardActions>
        </Card>
    )
}