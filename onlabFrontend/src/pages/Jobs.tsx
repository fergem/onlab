import { Card, CardBody, Flex, Heading, Text } from "@chakra-ui/react";
import { LoadPetsFromApi } from "../api/PetApi";
import { LoadUsersfromApi } from "../api/UserApi";
import { JobCard } from "../components/JobCard";

// const pets: IPet[] = [
//   // { id: 1, name: "Cica", description: "szep cica", species: "cica", age: 7 },
//   // {
//   //   id: 2,
//   //   name: "Kutyo",
//   //   description: "szep kutya",
//   //   species: "kutya",
//   //   age: 2,
//   // },
//   // {
//   //   id: 3,
//   //   name: "Teknoc",
//   //   description: "szep teknoc",
//   //   species: "teknoc",
//   //   age: 10,
//   // },

// ;

export default function Jobs() {
  return (
    <Flex
      px="15%"
      justify="center"
      direction="column"
      gap="7"
      py="2%"
      textAlign="center">
      <Heading as="h1">How does it work?</Heading>
      <Flex justify="space-between" px="10%">
        <Text fontSize="lg">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci cum
          aperiam consectetur tempora expedita, velit ex quasi pariatur nesciunt
          illo non quod totam. Beatae reiciendis maxime explicabo facilis, nulla
          voluptatum. Perferendis voluptate explicabo voluptatibus alias nisi
          molestias. Veniam eligendi voluptate repellendus quidem, illo quaerat
          eos odit provident harum incidunt deserunt illum velit corrupti
          cupiditate ex tempora laborum ducimus maiores. Delectus?
        </Text>
      </Flex>
      <Flex direction="row">
        <Card flexGrow="2" height="100%">
          <CardBody>
            <Heading as="h2" size="sm">
              Search for:
            </Heading>
          </CardBody>
        </Card>
        <Flex direction="column" flexWrap="wrap" px="4%" flexGrow="5">
          <>
            {LoadUsersfromApi().map((x) => (
              <JobCard key={x.id} user={x} />
            ))}
          </>
        </Flex>
      </Flex>
    </Flex>
  );
}
