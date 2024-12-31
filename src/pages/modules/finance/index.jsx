import {Box, Card, CardHeader, Flex, Group, Heading, Stack} from "@chakra-ui/react";
import {Checkbox} from "@/components/ui/checkbox.jsx";
import {Button} from "@/components/ui/button.jsx";

const FinancePage = () => {
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
                <Group gap={3} grow mt={"16px"} borderBottom={'1px solid #eee'} paddingBottom={'16px'}>
                    <input type="checkbox"/>
                    <Heading>Transaction one</Heading>
                    <p>Description</p>
                    <p>amount</p>

                    <Flex gap={3} justifyContent="end">
                        <Button>Detail</Button>
                        <Button>Delete</Button>
                    </Flex>
                </Group>
                <Group gap={3} grow mt={"16px"} borderBottom={'1px solid #eee'} paddingBottom={'16px'}>>
                    <input type="checkbox"/>
                    <Heading>Transaction one</Heading>
                    <p>Description</p>
                    <p>amount</p>

                    <Flex gap={3} justifyContent="end">
                        <Button>Detail</Button>
                        <Button>Delete</Button>
                    </Flex>
                </Group>
            </Stack>

        </Box>
    )
}

export {FinancePage};