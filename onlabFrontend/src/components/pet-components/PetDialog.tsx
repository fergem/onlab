import {
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Image,
  Text,
} from "@chakra-ui/react";
import Pet from "../../models/Pet";
import { baseDogPicture } from "../../utility/constants";

interface IPropsPetDialog {
  pet: Pet;
  onClose: () => void;
  isOpen: boolean;
}

const PetDialog: React.FC<IPropsPetDialog> = ({ pet, onClose, isOpen }) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{pet.name}</ModalHeader>
        <ModalCloseButton />
        <Divider colorScheme="cyan" />
        <ModalBody>
          {/* <ImageUpload></ImageUpload> */}
          <Image
            borderRadius="100"
            objectFit="cover"
            w="20vh"
            h="20vh"
            mx="3vh"
            mb="2vh"
            src={
              pet.image
                ? "data:image/png;base64," + pet.image.picture
                : baseDogPicture
            }
            alt="Your pets picture"
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
  );
};

export default PetDialog;
