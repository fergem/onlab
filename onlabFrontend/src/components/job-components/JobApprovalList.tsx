import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Wrap,
  useDisclosure,
  WrapItem,
  Card,
  CardBody,
  Heading,
  Flex,
  Image,
  Text,
  Button,
  SimpleGrid,
} from "@chakra-ui/react";
import { useApproveJob, useDeclineJob } from "../../hooks/JobHooks";
import Job from "../../models/Job";
import { baseProfilePicture } from "../../utility/constants";
import JobDialog from "./JobDialog";

export interface IPropsJobApprovalCard {
  job: Job;
}

export interface IPropsJobApprovalList {
  jobs: Job[];
}

export const JobApprovalList: React.FC<IPropsJobApprovalList> = ({ jobs }) => {
  return (
    <SimpleGrid
      w="100%"
      alignItems="center"
      spacing="2"
      columns={2}
      minChildWidth="200px">
      {jobs.map((x) => (
        <JobApprovalCard key={x.id} job={x} />
      ))}
    </SimpleGrid>
  );
};

const JobApprovalCard: React.FC<IPropsJobApprovalCard> = ({ job }) => {
  const [approveJob, isApproveing, error] = useApproveJob();
  const [declineJob, isDeciling, errorr] = useDeclineJob();

  const handleApproveJob = () => {
    approveJob(job.id);
  };
  const handleDeclineJob = () => {
    declineJob(job.id);
  };
  return (
    <Card color="#505168">
      <CardBody>
        <Flex
          direction="row"
          justifyContent="space-between"
          alignItems="center">
          <Image
            borderRadius="100"
            objectFit="cover"
            w="10vh"
            h="10vh"
            src={
              job.petSitterUserInformation?.picture
                ? "data:image/png;base64," +
                  job.petSitterUserInformation.picture
                : baseProfilePicture
            }
            alt="Job picture"
          />
          <Flex direction="column" mx="10%">
            <Text size="sm">
              {" "}
              {job.petSitterUserInformation?.userName} wants to apply for your
              job
            </Text>
          </Flex>

          <Flex direction="column">
            <Button m="5%" onClick={handleApproveJob}>
              <CheckIcon></CheckIcon>
            </Button>
            <Button m="5%">
              <CloseIcon onClick={handleDeclineJob}></CloseIcon>
            </Button>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
};
