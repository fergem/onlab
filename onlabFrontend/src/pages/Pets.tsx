import { Card, CardBody, Flex, Heading, Text } from "@chakra-ui/react";
import { JobCard } from "../components/JobCard";
import IPet from "../models/Pet";

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
];

export default function Pets() {
  return (
    <Flex
      px="15%"
      justify="center"
      direction="column"
      gap="7"
      py="2%"
      textAlign="center">
      <Heading as="h1">How does it work?</Heading>
      <Flex justify="space-between" px="20%">
        <Text fontSize="3xl">Bla bla</Text>
        <Text fontSize="3xl">Bla bla</Text>
        <Text fontSize="3xl">Bla bla</Text>
      </Flex>
      <Flex direction="row">
        <Card flexGrow="2">
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
          justify="space-around"
          px="4%"
          height="50rem"
          flexGrow="5">
          <>
            {pets.map((x) => (
              <JobCard key={x.id} pet={x} />
            ))}
          </>
        </Flex>
      </Flex>
    </Flex>
  );
}
