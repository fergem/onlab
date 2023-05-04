import {
  Card,
  Image,
  CardBody,
  Heading,
  Text,
  Flex,
  WrapItem,
  Wrap,
} from "@chakra-ui/react";
import Job from "../models/Job";
import { baseProfilePicture } from "../utility/constants";
import { StatusBadge } from "./StatusBadge";

interface IPropsJobCard {
  job: Job;
}

interface IPropsJobList {
  jobs: Job[];
}

export const JobList: React.FC<IPropsJobList> = ({ jobs }) => {
  return (
    <Wrap w="100%" justify="center" spacing="2%">
      {jobs.map((x) => (
        <JobCard key={x.id} job={x} />
      ))}
    </Wrap>
  );
};

const JobCard: React.FC<IPropsJobCard> = ({ job }) => {
  return (
    <WrapItem>
      <Card direction="row" my="2%" color="#505168" h="100%">
        <CardBody>
          <Image
            borderRadius="100"
            objectFit="cover"
            w="20vh"
            h="20vh"
            src={
              job.ownerUserInformation.picture
                ? "data:image/png;base64," + job.ownerUserInformation.picture
                : baseProfilePicture
            }
            alt="Caffe Latte"
            alignSelf="center"
            mx="3vh"
            mb="2vh"
          />
          <Heading size="md">{job.ownerUserInformation.userName}'s job</Heading>
          <Flex direction="column" alignItems="flex-start">
            {/* <Heading size="sm"> Work hours: {job.hours}</Heading> */}
            <Heading size="sm">{job.location}</Heading>
            <Text py="2">{job.description}</Text>
          </Flex>
        </CardBody>
      </Card>
    </WrapItem>
  );
};
