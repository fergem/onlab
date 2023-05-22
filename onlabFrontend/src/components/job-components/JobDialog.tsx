import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Divider,
  ModalBody,
  Flex,
  Image,
  Text,
  Box,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useAuth } from "../../hooks/AuthHooks";
import { useTakeJob } from "../../hooks/JobHooks";
import Job from "../../models/Job";
import { baseProfilePicture } from "../../utility/constants";

interface JobDialog {
  job: Job;
  onClose: () => void;
  isOpen: boolean;
}

const JobDialog: React.FC<JobDialog> = ({ job, onClose, isOpen }) => {
  const [takeJob, error, loading] = useTakeJob();
  const { user } = useAuth();
  const handleTakeJob = () => {
    takeJob(job.id);
    if (!error) onClose();
  };
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {job.ownerUserInformation?.userName ?? ""}'s job
        </ModalHeader>
        <ModalCloseButton />
        <Divider colorScheme="cyan" />
        <ModalBody>
          <Flex
            direction="row"
            justifyContent="space-between"
            alignItems="center">
            <Flex
              direction="column"
              justifyContent="center"
              alignItems="center">
              <Image
                borderRadius="100"
                objectFit="cover"
                w="20vh"
                h="20vh"
                mx="3vh"
                mb="2vh"
                src={
                  job.ownerUserInformation?.picture
                    ? "data:image/png;base64," +
                      job.ownerUserInformation.picture
                    : baseProfilePicture
                }
                alt="Your picture"
              />
              <Flex
                direction="column"
                alignItems="center"
                justifyContent="space-evenly"
                h="100%">
                <Box backgroundColor="gray.100">
                  <Text>{job.hours} hours of work</Text>
                </Box>
                <Text>{job.location}</Text>
                <Text>{job.payment}$/hours</Text>
              </Flex>
            </Flex>
            <Flex direction="column" justifyContent="center" w="50%">
              <Text>Description: </Text>
              <Text>{job.description}</Text>
              {user?.userName === job.ownerUserInformation?.userName ? (
                <></>
              ) : (
                <Button onClick={handleTakeJob}>Take Job</Button>
              )}
              <Text>{job.status?.name ?? "No"} status</Text>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default JobDialog;
