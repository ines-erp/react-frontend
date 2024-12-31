import {Box, Card, CardHeader, Flex, For, Group, Heading, Stack} from "@chakra-ui/react";
import {Checkbox} from "@/components/ui/checkbox.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useEffect, useState} from "react";

const FinancePage = () => {
    // const [incomes, setIncomes] = useState([]);
    // const [outcomes, setOutcomes] = useState([]);
    const [transactions, setTransactions] = useState([]);

    const getTransaction = async (endpoint) => {
        return await fetch(`/api/${endpoint}`, {
            method: "GET", headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((res) => res.json()).then((data) => data)
    };

    const handleTransactions = async () => {
        const incomes = await getTransaction('incomes').then(data => data);
        const outcomes = await getTransaction('outcomes').then(data => data);
        const transactions = [...incomes, ...outcomes];
        setTransactions(transactions);
    }

    useEffect(() => {
        handleTransactions();
    }, [])

    console.log(transactions)
    return (
        <Box flexGrow="1"
             bgColor={"#eee"}
             height="calc(100vh - 64px)"
             padding={"32px"}
        >

            <Heading as={"h1"}>Finance</Heading>

            <Group gap={3} grow my={"32px"}>
                <Card.Root>
                    <Card.Body>
                        <Card.Title>Incomes</Card.Title>
                        <Card.Description>R$ 200,00</Card.Description>
                    </Card.Body>
                    <Card.Footer>
                        blablabla
                    </Card.Footer>
                </Card.Root>
                <Card.Root>
                    <Card.Body>
                        <Card.Title>Outcom</Card.Title>
                        <Card.Description>R$ 200,00</Card.Description>
                    </Card.Body>
                    <Card.Footer>
                        blablabla
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
                {transactions?.map(({name, description, amount, id}) => {
                    return (
                        <Group key={id} gap={3} grow mt={"16px"} borderBottom={'1px solid #eee'}
                               paddingBottom={'16px'}>
                            <input type="checkbox"/>
                            <Heading>{name}</Heading>
                            <p>{description}</p>
                            <p>{amount}</p>

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