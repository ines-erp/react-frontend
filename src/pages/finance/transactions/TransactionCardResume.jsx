import {Box, Button, Card, CardContent, Typography} from "@mui/material";
import {Link} from "react-router-dom";

export const TransactionCardResume = ({transaction}) => {
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
            variant={"outlined"}
            key={transaction.id}
            sx={{background: transaction.transactionType.name.toLowerCase() === "income" ? "#00ff0009" : "#ff000009"}}
        >

            <CardContent
                sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}
            >

                <Typography variant={"h3"} fontSize={"1rem"}>
                    {name}
                </Typography>

                <Typography>
                    {transactionTypeName}
                </Typography>
                <Typography>
                    {currencySymbol}: {amount.toFixed(2)}
                </Typography>

                <Typography>
                    {description.substring(0, 30) + "..."}
                </Typography>

                <Box sx={{display: "flex", gap: "8px", alignItems: "center", my: "auto"}}>
                    <Button
                        as={Link}
                        variant={"outlined"}
                        sx={{background: "#fff"}}
                        to={`details/${id}`}
                    >
                        Details
                    </Button>

                    <Button
                        componet={Link}
                        variant={"outlined"}
                        color={"error"}
                        sx={{background: "#fff"}}
                        onClick={() => handleDelete(id)}
                    >
                        Delete
                    </Button>
                </Box>

            </CardContent>
        </Card>
    )
}