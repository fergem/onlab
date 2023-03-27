import { WarningIcon } from "@chakra-ui/icons";
import { Spinner, Heading, Flex } from "@chakra-ui/react";
import { JobList } from "./JobList";
import { useGetAvailableJobs } from "../hooks/JobHooks";

export default function PetSitterProfile() {
  const [jobs, error, loading] = useGetAvailableJobs();
  let jobItems;
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
          Error
        </Heading>
      </>
    );
  } else {
    jobItems = <JobList jobs={jobs}></JobList>;
  }
  return (
    <Flex direction="column" flexWrap="wrap" alignItems="center">
      <Heading as="h2" size="md">
        Your undertook jobs:
      </Heading>
      {jobItems}
    </Flex>
  );
}
