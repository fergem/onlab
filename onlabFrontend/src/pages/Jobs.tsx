import { WarningIcon } from "@chakra-ui/icons";
import { Flex, Heading, Spinner, Text, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import JobFilter from "../components/job-components/JobFilter";
import { JobList } from "../components/job-components/JobList";
import { useGetJobs } from "../hooks/JobHooks";
import { JobParameters } from "../models/Job";
import { StatusName } from "../models/Status";

export default function Jobs() {
  let jobItems = null;
  const [jobFilter, setJobFilter] = useState<JobParameters>({
    jobHoursRange: {
      minHours: 0,
      maxHours: 12,
    },
    statusName: StatusName.Available,
  });
  const [jobs, error, loading, refetch] = useGetJobs(jobFilter);
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
      h="inherit"
      alignItems="center">
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
      <JobFilter
        jobFilter={jobFilter}
        setJobFilter={setJobFilter}
        refetch={refetch}></JobFilter>
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
