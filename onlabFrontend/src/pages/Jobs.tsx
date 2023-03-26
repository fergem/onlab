import { Card, CardBody, Flex, Heading, Text } from "@chakra-ui/react";
import { JobCard } from "../components/JobCard";
import { jobs } from "../models/DummyData";

export default function Jobs() {
  return (
    <Flex
      px="20%"
      direction="column"
      gap="7"
      py="2%"
      textAlign="center"
      h="inherit">
      <Heading as="h1">How does it work?</Heading>
      <Flex justify="space-between" px="10%">
        <Text fontSize="lg">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Provident iusto
          quibusdam, fugiat eius, similique accusantium possimus alias neque
          cupiditate porro molestiae dolore sunt! Necessitatibus sapiente
          voluptatem voluptatibus magnam doloremque incidunt.
        </Text>
      </Flex>
      <Flex direction="row" justifyContent="center">
        <Card height="100%" flexGrow="1" minH="20vh" minW="20vh">
          <CardBody>
            <Heading as="h2" size="sm">
              Search for:
            </Heading>
          </CardBody>
        </Card>
        <Flex direction="column" flexWrap="wrap" px="5%" flexGrow="5">
          {/* <>
            {LoadUsersfromApi().map((x) => (
              <JobCard key={x.id} user={x} />
            ))}
          </>*/}
          <Heading as="h2" size="md">
            Available jobs
          </Heading>
          {jobs.map((x) => (
            <JobCard key={x.id} job={x} />
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
}
