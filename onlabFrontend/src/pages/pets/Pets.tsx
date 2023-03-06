import { Card, CardBody, Flex, Heading, Text } from "@chakra-ui/react"

export default function Pets() {
    return (
        <Flex
            px="20%"
            justify="center"
            direction="column"
            gap="7"
            py="2%"
            textAlign="center"
        >
            <Heading as="h1">How does it work?</Heading>
            <Flex justify="space-between" px="20%">
                <Text fontSize="3xl">Bla bla</Text>
                <Text fontSize="3xl">Bla bla</Text>
                <Text fontSize="3xl">Bla bla</Text>
            </Flex>
            <Flex direction="row" justify="space-between">
                <Card px="7%">
                    <CardBody>
                        <Flex>
                            <Heading as="h2" size="sm">
                                Search for:
                            </Heading>
                        </Flex>
                    </CardBody>
                </Card>
                <Flex direction="column" justify="center" px="20%">
                    <Heading as="h2" size="sm" textAlign="center">
                        Here is your nearby Pet Sitters
                    </Heading>
                </Flex>
            </Flex>
        </Flex>
    )
}
