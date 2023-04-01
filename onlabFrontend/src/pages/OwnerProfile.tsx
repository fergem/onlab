import { WarningIcon } from "@chakra-ui/icons";
import { Spinner, Heading, Flex, Button, Box } from "@chakra-ui/react";
import { JobList } from "../components/JobList";
import { useGetAvailableJobs } from "../hooks/JobHooks";
import NavButton from "../components/NavButton";

export default function OwnerProfile() {
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
    <Flex
      px="20%"
      direction="column"
      gap="7"
      py="2%"
      textAlign="center"
      h="inherit">
      <Flex direction="column" flexWrap="wrap" alignItems="center">
        <Box m="2%">
          <NavButton
            name="Create new petsitting job"
            route="createpetsitterjob"></NavButton>
        </Box>
        <Heading as="h2" size="md">
          Your current Jobs available:
        </Heading>
        {jobItems}
      </Flex>
    </Flex>
  );
}
