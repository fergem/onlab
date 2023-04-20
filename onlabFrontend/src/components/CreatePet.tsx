import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Heading,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { Formik, Field } from "formik";
import { useRef, useState } from "react";
import { Form } from "react-router-dom";
import { UserService } from "../services/UserService";

import Pet from "../models/Pet";
import CreatePetForm from "./CreatePetForm";

export default function CreatePet() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);

  return (
    <>
      <Button onClick={onOpen} ml="30%">
        Add a pet
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        initialFocusRef={initialRef}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a pet of yours</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CreatePetForm></CreatePetForm>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
