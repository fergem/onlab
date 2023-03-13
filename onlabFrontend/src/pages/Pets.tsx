import { Card, CardBody, Flex, Heading, Text } from "@chakra-ui/react"
import { JobCard } from "../components/JobCard"
import Pet from "../models/Pet"
import IPet from "../models/Pet"

const pets: IPet[] = [
    { id: 1, name: "Cica", description: "szep cica", species: "cica", age: 7 },
    {
        id: 2,
        name: "Kutyo",
        description: "szep kutya",
        species: "kutya",
        age: 2,
    },
    {
        id: 3,
        name: "Teknoc",
        description: "szep teknoc",
        species: "teknoc",
        age: 10,
    },
]

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
                <Flex
                    direction="column"
                    justify="space-between"
                    px="10%"
                    height="50rem"
                >
                    <Heading as="h2" size="sm" textAlign="center">
                        Here is your nearby Pet Sitters
                    </Heading>
                    <>
                        {pets.map((x) => (
                            <JobCard key={x.id} pet={x}/>
                        ))}
                    </>
                </Flex>
            </Flex>
        </Flex>
    )
}
