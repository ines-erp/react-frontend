import {Box, Card, CardHeader, Flex, For, Group, Heading, Stack} from "@chakra-ui/react";
import {Checkbox} from "@/components/ui/checkbox.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useEffect, useState} from "react";

const AVALIABLE_CURRENCIES = [
    {
        id: 1,
        name: "Brazilian Real",
        symbol: "R$"
    },
    {
        id: 2,
        name: "Euro",
        symbol: "€"
    },
]

const FinancePage = () => {
    const [transactions, setTransactions] = useState([]);

    let incomes = transactions.filter((transaction) => (transaction.transactionType.name).toLowerCase() === "income");
    let outcomes = transactions.filter((transaction) => (transaction.transactionType.name).toLowerCase() === "outcome");
    const [currency, setCurrency] = useState(AVALIABLE_CURRENCIES[0])
    ;

    const totalIncomes = incomes.reduce((totalAmount, currentAmount) => totalAmount + currentAmount.amount, 0)
    const totalOutcomes = outcomes.reduce((totalAmount, currentAmount) => totalAmount + currentAmount.amount, 0)

    const getTransactions = (filterOn = "currencyName") => {

        if (filterOn) {
            fetch("api/transactions?" + (new URLSearchParams({
                filterOn: filterOn,
                filterQuery: currency.name
            })).toString(), {
                method: "GET",
                headers: {"Content-Type": "application/json"}
            })
                .then((res) => res.json())
                .then((data) => setTransactions(data))
        }

        // fetch("api/transactions?" + (new URLSearchParams({
        //     filterOn: currency[1].filterOn,
        //     filterQuery: currency[1].filterQyery
        // })).toString(), {
        //     method: "GET",
        //     headers: {"Content-Type": "application/json"}
        // })
        //     .then((res) => res.json())
        //     .then((data) => setTransactions(data))
    }

    useEffect(() => {
        getTransactions();
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