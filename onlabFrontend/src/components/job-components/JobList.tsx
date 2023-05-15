import {
  Card,
  Image,
  CardBody,
  Heading,
  Text,
  Flex,
  WrapItem,
  Wrap,
  useDisclosure,
} from "@chakra-ui/react";
import Job from "../../models/Job";
import { baseProfilePicture } from "../../utility/constants";
import JobDialog from "./JobDialog";

export interface IPropsJobCard {
  job: Job;
}

export interface IPropsJobList {
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <WrapItem>
      <Card my="2%" color="#505168" h="100%" onClick={onOpen}>
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
            alt="Job picture"
            mx="3vh"
            mb="2vh"
          />
          <Heading size="md">{job.ownerUserInformation.userName}'s job</Heading>
          <Flex direction="column" justifyContent="center" alignItems="center">
            <Text size="sm"> {job.hours} hours of work</Text>
            <Text size="sm">{job.location}</Text>
          </Flex>
          <JobDialog job={job} onClose={onClose} isOpen={isOpen}></JobDialog>
        </CardBody>
      </Card>
    </WrapItem>
  );
};
