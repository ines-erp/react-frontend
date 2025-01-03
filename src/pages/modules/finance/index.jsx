import {Box, Card, CardHeader, Flex, For, Group, Heading, Stack} from "@chakra-ui/react";
import {Checkbox} from "@/components/ui/checkbox.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useEffect, useState} from "react";

const FinancePage = () => {
    const [transactions, setTransactions] = useState([]);

    let incomes = transactions.filter((transaction) => (transaction.transactionType.name).toLowerCase() === "income");
    let outcomes = transactions.filter((transaction) => (transaction.transactionType.name).toLowerCase() === "outcome");

    const totalIncomes = incomes.reduce((totalAmount, currentAmount) => totalAmount + currentAmount.amount, 0)
    const totalOutcomes = outcomes.reduce((totalAmount, currentAmount) => totalAmount + currentAmount.amount, 0)

    const handleTransactions = () => {
        fetch("api/transactions", {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        })
            .then((res) => res.json())
            .then((data) => setTransactions(data))
    }

    useEffect(() => {
        handleTransactions();
    }, [])


    // console.log(transactions)
    return (
        <Box flexGrow="1"
             bgColor={"#eee"}
             height="calc(100vh - 64px)"
             padding={"32px"}
        >

            <Flex>
                <Heading as={"h1"}>
                    Finance
                </Heading>
                
                Currency:
                <select>
                    <option value="Euro" defaultChecked>Euro</option> 
                    <option value="Real">Real</option> 
                </select>
            </Flex>

            <Group gap={3} grow my={"32px"}>
                <Card.Root>
                    <Card.Body>
                        <Card.Title>Incomes</Card.Title>
                        <Card.Description>
                            {totalIncomes}
                        </Card.Description>
                    </Card.Body>
                    <Card.Footer>
                        currency
                    </Card.Footer>
                </Card.Root>
                <Card.Root>
                    <Card.Body>
                        <Card.Title>Outcome</Card.Title>
                        <Card.Description>{totalOutcomes}</Card.Description>
                    </Card.Body>
                    <Card.Footer>
                        currency
                    </Card.Footer>
                </Card.Root>
                <Card.Root>
                    <Card.Body>
                        <Card.Title>Balance</Card.Title>
                        <Card.Description>R$ 200,00</Card.Description>
                    </Card.Body>
                    <Card.Footer>
                        blablabla
                    </Card.Footer>
                </Card.Root>
            </Group>

            <Stack spacing={2} my={"32px"} bgColor={"#fff"} borderRadius={4} border={'1px solid #eee'} padding={'32px'}>
                <Heading as={"h2"}>Last Transactions</Heading>
                {transactions?.map(({name, description, amount, id, currency}) => {
                    return (
                        <Group key={id} gap={3} grow mt={"16px"} borderBottom={'1px solid #eee'}
                               paddingBottom={'16px'}>
                            <input type="checkbox"/>
                            <Heading>{name}</Heading>
                            <p>{description}</p>
                            <p>{currency.symbol} {amount.toFixed(2)}</p>

                            <Flex gap={3} justifyContent="end">
                                <Button>Detail</Button>
                                <Button>Delete</Button>
                            </Flex>
                        </Group>
                    )
                })}

            </Stack>

        </Box>
    )
}

export {FinancePage};