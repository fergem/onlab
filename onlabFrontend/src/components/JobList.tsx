import {
  Card,
  Image,
  CardBody,
  Heading,
  Text,
  Flex,
  CardHeader,
} from "@chakra-ui/react";
import Job from "../models/Job";
import { StatusBadge } from "./StatusBadge";

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
    <Card direction="row" my="2%" w="45rem" color="#505168" h="30vh">
      <Image
        borderRadius="10"
        objectFit="cover"
        w="20vh"
        h="20vh"
        src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
        alt="Caffe Latte"
        alignSelf="center"
        mx="3vh"
      />
      <CardBody>
        <Flex direction="row" justifyContent="space-between" mb="2vh" mt="3vh">
          <Heading size="md">
            {!job.ownerUser?.userName && "undefined"}'s job
          </Heading>
          <StatusBadge status={job.status}></StatusBadge>
        </Flex>
        <Flex direction="column" alignItems="flex-start">
          {/* <Heading size="sm"> Work hours: {job.hours}</Heading> */}
          <Heading size="sm">{job.location}</Heading>
          <Text py="2">{job.description}</Text>
        </Flex>
      </CardBody>
    </Card>
  );
};
