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
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import Pet from "../models/Pet";
import { baseDogPicture } from "../utility/constants";
import ImageUpload from "./PetImageUpload";

interface IPropsPetCard {
  pet: Pet;
}

interface IPropsPetList {
  pets: Pet[];
}

export const PetList: React.FC<IPropsPetList> = ({ pets }) => {
  return (
    <Wrap w="100%" justify="center" spacing="2%">
      {pets.map((x) => (
        <PetCard key={x.id} pet={x} />
      ))}
    </Wrap>
  );
};

const PetCard: React.FC<IPropsPetCard> = ({ pet }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <WrapItem>
      <Card w="xs" h="xs" justifyContent="center" alignItems="center">
        <CardBody>
          <Text fontSize="lg">{pet.name}</Text>
          <Image
            onClick={onOpen}
            w="2xs"
            h="2xs"
            src={
              pet.image
                ? "data:image/png;base64," + pet.image.picture
                : baseDogPicture
            }
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
                {/* <ImageUpload></ImageUpload> */}
                <Image
                  w="2xs"
                  h="2xs"
                  src={
                    pet.image
                      ? "data:image/png;base64," + pet.image.picture
                      : baseDogPicture
                  }
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
    </WrapItem>
  );
};
