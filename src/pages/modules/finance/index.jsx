import {
    Box,
    Card,
    Flex,
    Group,
    Heading,
    Stack,
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectRoot,
    SelectTrigger,
    SelectValueText, createListCollection,
} from "@chakra-ui/react";
import {Button} from "@/components/ui/button.jsx";
import {useEffect, useState} from "react";

const AVALIABLE_CURRENCIES = [
    {
        id: 1,
        label: "Brazilian Real",
        value: "R$"
    },
    {
        id: 2,
        label: "Euro",
        value: "€"
    },
]

const FinancePage = () => {
    const [transactions, setTransactions] = useState([]);
    const [currency, setCurrency] = useState(AVALIABLE_CURRENCIES[0])

    let incomes = transactions.filter((transaction) => (transaction.transactionType.name).toLowerCase() === "income");
    let outcomes = transactions.filter((transaction) => (transaction.transactionType.name).toLowerCase() === "outcome");

    const avaliableCurrenciesCollectio = createListCollection({items: [...AVALIABLE_CURRENCIES]})

    const totalIncomes = incomes.reduce((totalAmount, currentAmount) => totalAmount + currentAmount.amount, 0)
    const totalOutcomes = outcomes.reduce((totalAmount, currentAmount) => totalAmount + currentAmount.amount, 0)

    const getTransactions = (filterOn = "currencyName") => {

        if (filterOn) {
            fetch("api/transactions?" + (new URLSearchParams({
                filterOn: filterOn,
                filterQuery: currency.label
            })).toString(), {
                method: "GET",
                headers: {"Content-Type": "application/json"}
            })
                .then((res) => res.json())
                .then((data) => setTransactions(data))
        }
    }

    useEffect(() => {
        getTransactions();
    }, [currency])

    
    const handleChangeCurrency = (value) => {
        const currencyIndex = AVALIABLE_CURRENCIES.findIndex(currency => currency.value === value[0]);
        if (currencyIndex >= 0) {
            setCurrency(AVALIABLE_CURRENCIES[currencyIndex]);
        }
    }
    

    return (
        <Box flexGrow="1"
             bgColor={"#eee"}
             height="calc(100vh - 64px)"
             padding={"32px"}
        >

            <Flex justifyContent="space-between">
                <Heading as={"h1"}>
                    Finance
                </Heading>

                <SelectRoot
                    collection={avaliableCurrenciesCollectio}
                    size="sm"
                    width="320px"
                    value={currency.label}
                    onValueChange={(e) => handleChangeCurrency(e.value)}
                    style={{position: "relative"}}

                >

                    <SelectTrigger>
                        <SelectValueText placeholder={currency.label}/>
                    </SelectTrigger>
                    <SelectContent style={{zIndex: 100, position: "absolute", width: "100%", marginTop: "40px"}}>
                        {AVALIABLE_CURRENCIES.map((c) => (
                            <SelectItem item={c} key={c.id}>
                                {c.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </SelectRoot>
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