import {Box, Card, CardHeader, Flex, Group, Heading, Stack} from "@chakra-ui/react";

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



        </Box>
    )
}

export {FinancePage};