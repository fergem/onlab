import {
  Card,
  CardBody,
  Text,
  Image,
  Flex,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Divider,
} from "@chakra-ui/react";
import Pet from "../models/Pet";

interface IPropsPetCard {
  pet: Pet;
}

interface IPropsPetList {
  pets: Pet[];
}

export const PetList: React.FC<IPropsPetList> = ({ pets }) => {
  return (
    <>
      {pets.map((x) => (
        <PetCard key={x.id} pet={x} />
      ))}
    </>
  );
};

const PetCard: React.FC<IPropsPetCard> = ({ pet }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Card w="xs" h="xs" justifyContent="center" alignItems="center">
      <CardBody>
        <Text fontSize="lg">{pet.name}</Text>
        <Image
          onClick={onOpen}
          w="2xs"
          h="2xs"
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />

        <Modal onClose={onClose} isOpen={isOpen} isCentered size="md">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{pet.name}</ModalHeader>
            <ModalCloseButton />
            <Divider colorScheme="cyan" />
            <ModalBody>
              <Image
                w="2xs"
                h="2xs"
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                alt="Green double couch with wooden legs"
                borderRadius="lg"
              />
              <Flex mt="6" direction="column">
                <Text>{pet.description}</Text>
                <Text color="blue.600" fontSize="md">
                  {pet.age} years old.
                </Text>
              </Flex>
            </ModalBody>
            {/* <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter> */}
          </ModalContent>
        </Modal>
      </CardBody>
    </Card>
  );
};
