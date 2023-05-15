import { CheckIcon, CloseIcon, WarningIcon } from "@chakra-ui/icons";
import { Spinner, Heading, Flex, Button, Box } from "@chakra-ui/react";
import { useGetApprovals, useGetUserPostedJobs } from "../hooks/JobHooks";
import NavButton from "../components/NavButton";
import { useEffect } from "react";
import { JobList } from "../components/job-components/JobList";
import { StatusName } from "../models/Status";
import { JobApprovalList } from "../components/job-components/JobApprovalList";

export default function OwnerProfile() {
  const [jobs, error, loading, refetch] = useGetUserPostedJobs({
    jobHoursRange: {
      minHours: 0,
      maxHours: 12,
    },
    statusName: StatusName.Empty,
  });
  const [approvals, e, l, refetchApprovals] = useGetApprovals();
  useEffect(() => {
    refetch();
    refetchApprovals();
  }, []);
  let jobItems = null;
  let jobsToApprove = null;
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
    if (!!jobs) {
      jobItems = <JobList jobs={jobs}></JobList>;
    }
  }
  jobsToApprove = <JobApprovalList jobs={approvals}></JobApprovalList>;

  return (
    <Flex
      px="20%"
      direction="column"
      gap="7"
      py="2%"
      textAlign="center"
      h="inherit">
      <Heading as="h2" size="md">
        Your pending job approvals
      </Heading>
      <Flex direction="column" flexWrap="wrap" alignItems="center">
        {jobsToApprove}
      </Flex>
      <Flex direction="column" flexWrap="wrap" alignItems="center">
        <Box m="2%">
          {jobs.length > 0 ?? (
            <NavButton
              name="Create new petsitting job"
              route="/createpetsitterjob"></NavButton>
          )}
        </Box>
        <Heading as="h2" size="md">
          Your posted jobs all time:
        </Heading>
        {jobs.length > 0 ? (
          <>
            <NavButton
              name="Create new petsitting job"
              route="/createpetsitterjob"></NavButton>
            {jobItems}
          </>
        ) : (
          <Heading size="lg">
            You've currently got no posted jobs. Consider posting one with the{" "}
            <NavButton
              name="Create new petsitting job"
              route="/createpetsitterjob"></NavButton>{" "}
            button.
          </Heading>
        )}
      </Flex>
    </Flex>
  );
}
