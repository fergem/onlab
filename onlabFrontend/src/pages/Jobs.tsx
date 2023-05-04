import { WarningIcon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
  Flex,
  Heading,
  Spinner,
  Text,
  Button,
  Wrap,
} from "@chakra-ui/react";
import { JobList } from "../components/JobList";
import { useEffect } from "react";
import { useGetAvailableJobs } from "../hooks/JobHooks";

export default function Jobs() {
  let jobItems = null;
  const [jobs, error, loading, refetch] = useGetAvailableJobs();
  useEffect(() => {
    refetch();
  }, []);
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
    if (!!jobs) jobItems = <JobList jobs={jobs}></JobList>;
  }

  //jobItems = <JobList jobs={dummyJobs}></JobList>;

  return (
    <Flex
      px="10%"
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
      <Heading as="h2" size="md">
        Available jobs
      </Heading>
      {jobs.length > 0 ? (
        jobItems
      ) : (
        <Heading size="lg">There are currently no available jobs</Heading>
      )}
    </Flex>
  );
}
