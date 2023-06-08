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
  SimpleGrid,
  Wrap,
  WrapItem,
  Heading,
  Container,
} from "@chakra-ui/react";
import { useAuth } from "../../hooks/AuthHooks";
import { useTakeJob } from "../../hooks/JobHooks";
import Job from "../../models/Job";
import Pet from "../../models/Pet";
import { baseDogPicture, baseProfilePicture } from "../../utility/constants";

interface JobDialog {
  job: Job;
  onClose: () => void;
  isOpen: boolean;
}

const JobDialog: React.FC<JobDialog> = ({ job, onClose, isOpen }) => {
  const [takeJob] = useTakeJob();
  const { user } = useAuth();
  const toast = useToast({ duration: 5000, isClosable: true });

  const handleTakeJob = () => {
    takeJob(job.id, {
      onSuccess: () => {
        toast({
          title: "Job taken",
          description: `You have taken the job`,
          status: "success",
        });
        onClose();
      },
      onError: (err: any) => {
        toast({
          title: "Job not taken",
          description: err.response.data,
          status: "error",
        });
      },
    });
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered size="3xl">
      <ModalOverlay />
      <ModalContent marginTop="100px">
        <ModalHeader>
          {job.ownerUserInformation?.userName ?? ""}'s job
        </ModalHeader>
        <ModalCloseButton />
        <Divider colorScheme="cyan" />
        <ModalBody>
          <Flex direction="column" alignItems="center">
            <Flex
              direction="row"
              justifyContent="center"
              alignItems="center"
              w="100%"
              p="3%">
              <Flex
                direction="column"
                alignItems="center"
                justifyContent="center"
                flex="1 1 0">
                <Image
                  borderRadius="200"
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
                <Box backgroundColor="gray.100">
                  <Text>{job.hours} hours of work</Text>
                </Box>
                <Text>{job.payment}$/hours</Text>
              </Flex>

              <Flex
                direction="column"
                justifyContent="space-evenly"
                gap="10px"
                flex="1 1 0"
                alignItems="flex-left"
                marginLeft="1vw">
                <Container>
                  <Heading as="h2" size="md">
                    Description:{" "}
                  </Heading>
                  <Text>{job.description}</Text>
                </Container>
                <Container>
                  {" "}
                  <Heading as="h2" size="md">
                    Availability:{" "}
                  </Heading>
                  <Text>{job.status?.name ?? "No"}</Text>
                </Container>

                <Container>
                  <Heading as="h2" size="md">
                    Location:{" "}
                  </Heading>
                  <Text>{job.location ?? "No"}</Text>
                </Container>

                <Container>
                  <Heading as="h2" size="md">
                    Minimum required experience:{" "}
                  </Heading>
                  <Text>{job.minRequiredExperience ?? "No"} years</Text>
                </Container>
              </Flex>
            </Flex>
            <Divider />
            <Flex
              direction="column"
              alignItems="center"
              paddingBottom="3%"
              marginTop="1%"
              gap="10px">
              <Text>Pets that you will have to look for</Text>
              <Wrap spacing="10px" alignItems="center">
                {job.pets?.map((s) => (
                  <PetDescription key={s.id} pet={s} />
                ))}
              </Wrap>
            </Flex>
          </Flex>
          {user?.userName === job.ownerUserInformation?.userName ? (
            <></>
          ) : (
            <Button onClick={handleTakeJob}>Take Job</Button>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export interface IPetsProps {
  pet: Pet;
}

export const PetDescription: React.FC<IPetsProps> = ({ pet }) => {
  return (
    <WrapItem>
      <Flex
        direction="column"
        borderRadius="10px"
        alignItems="center"
        justifyContent="center"
        border="1px solid #505168"
        width="10vw">
        <Image
          objectFit="cover"
          w="20vh"
          h="20vh"
          mx="3vh"
          mb="2vh"
          src={
            pet.image
              ? "data:image/png;base64," + pet.image.picture
              : baseDogPicture
          }></Image>
        <Text>{pet.name}</Text>
      </Flex>
    </WrapItem>
  );
};

export default JobDialog;
