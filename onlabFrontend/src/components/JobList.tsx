import {
  Card,
  Image,
  Stack,
  CardBody,
  Heading,
  Text,
  CardFooter,
  Button,
  Flex,
} from "@chakra-ui/react";
import Job from "../models/Job";
import User from "../models/User";

interface IPropsJobCard {
  job: Job;
}

interface IPropsJobList {
  jobs: Job[];
}

export const JobList: React.FC<IPropsJobList> = ({ jobs }) => {
  return (
    <>
      {jobs.map((x) => (
        <JobCard key={x.id} job={x} />
      ))}
    </>
  );
};

const JobCard: React.FC<IPropsJobCard> = ({ job }) => {
  return (
    <Card direction="row" my="2%" w="45rem">
      <Image
        objectFit="cover"
        maxW="30%"
        h="20vh"
        src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
        alt="Caffe Latte"
      />
      <CardBody>
        <Flex direction="column">
          <Flex direction="row" w="inherit" justifyContent="space-between">
            <Heading size="md">{job.location}</Heading>
            <Heading size="sm" alignSelf="end">
              Work hours: {job.hours}
            </Heading>
          </Flex>
          <Text py="2">{job.description}</Text>
        </Flex>
      </CardBody>
    </Card>
  );
};
