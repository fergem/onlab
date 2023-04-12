import { WarningIcon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
  Flex,
  Heading,
  Spinner,
  Text,
  Button,
} from "@chakra-ui/react";
import { JobList } from "../components/JobList";
import { useEffect } from "react";
import { useGetAvailableJobs } from "../hooks/JobHooks";
import { dummyJobs } from "../models/DummyData";

export default function Jobs() {
  let jobItems;
  const [jobs, error, loading, refetch] = useGetAvailableJobs();
  useEffect(() => {
    if (error) {
      refetch();
    }
  });
  if (loading) {
    jobItems = (
      <>
        <Spinner boxSize="100px" marginTop="10%" alignSelf="center" />
        <Heading as="h3" size="sm" marginTop="2%">
          Loading...
        </Heading>
      </>
    );
  } else if (error) {
    jobItems = (
      <>
        <WarningIcon
          boxSize="100px"
          marginTop="10%"
          alignSelf="center"></WarningIcon>
        <Heading as="h3" size="sm">
          Error happened
        </Heading>
        <Button onClick={() => refetch()}>Click me to try again!</Button>
      </>
    );
  } else {
    jobItems = <JobList jobs={jobs}></JobList>;
  }
  jobItems = <JobList jobs={dummyJobs}></JobList>;

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
      <Flex direction="row" justifyContent="space-between">
        <Card height="100%" boxSize="200px">
          <CardBody>
            <Heading as="h2" size="sm">
              Search for:
            </Heading>
          </CardBody>
        </Card>
        <Flex
          direction="column"
          flexWrap="wrap"
          px="5%"
          flexGrow="1"
          alignItems="center">
          <Heading as="h2" size="md">
            Available jobs
          </Heading>
          {jobItems}
        </Flex>
      </Flex>
    </Flex>
  );
}
