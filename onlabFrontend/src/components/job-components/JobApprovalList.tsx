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

export interface IPropsJobApprovalCard {
  job: Job;
}

export interface IPropsJobApprovalList {
  jobs: Job[];
}

export const JobApprovalList: React.FC<IPropsJobApprovalList> = ({ jobs }) => {
  return (
    <SimpleGrid
      w="50%"
      alignItems="center"
      spacing="2"
      columns={1}
      minChildWidth="100%">
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
            <Button>
              <CheckIcon></CheckIcon>
            </Button>
            <Button>
              <CloseIcon onClick={handleDeclineJob}></CloseIcon>
            </Button>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
};
