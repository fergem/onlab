import { WarningIcon } from "@chakra-ui/icons";
import { Spinner, Heading, Flex, Button, Box } from "@chakra-ui/react";
import { JobList } from "../components/JobList";
import { useGetUserPostedJobs } from "../hooks/JobHooks";
import NavButton from "../components/NavButton";
import { useEffect } from "react";

export default function OwnerProfile() {
  const [jobs, error, loading, refetch] = useGetUserPostedJobs();
  useEffect(() => {
    refetch();
  }, []);
  let jobItems = null;
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
    if (!jobs) jobItems = <JobList jobs={jobs}></JobList>;
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
          {!jobItems ?? (
            <NavButton
              name="Create new petsitting job"
              route="/createpetsitterjob"></NavButton>
          )}
        </Box>
        <Heading as="h2" size="md">
          Your current Jobs available:
        </Heading>
        {!jobItems ? (
          <Heading size="lg">
            You've currently got no posted jobs. Consider posting one with the{" "}
            <NavButton
              name="Create new petsitting job"
              route="/createpetsitterjob"></NavButton>{" "}
            button.
          </Heading>
        ) : (
          jobItems
        )}
      </Flex>
    </Flex>
  );
}
