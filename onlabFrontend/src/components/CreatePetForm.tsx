import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Spinner,
  Heading,
  Select,
  Flex,
} from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import { useState } from "react";
import Pet from "../models/Pet";
import { UserService } from "../services/UserService";
import * as Yup from "yup";

export default function CreatePetForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const validationSchema = Yup.object().shape({
    //name: Yup.string().required("This field is required!"),
    //description: Yup.string().required("This field is required!"),
    //species: Yup.string().required("This field is required!"),
    //age: Yup.string().required("This field is required!"),
  });

  const initialValues: {
    name: string;
    description: string;
    species: string;
    age: number;
  } = {
    name: "",
    description: "",
    species: "",
    age: 0,
  };

  const handleCreatePet = (formValue: {
    name: string;
    description: string;
    species: string;
    age: number;
  }) => {
    const { name, description, species, age } = formValue;
    setMessage("");
    setLoading(true);
    console.log(name);
    UserService.insertPet({ name, description, species, age } as Pet).then(
      () => {
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
      }
    );
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleCreatePet}
      validationSchema={validationSchema}>
      <Form>
        <VStack spacing={4} align="flex-start">
          <FormControl>
            <FormLabel htmlFor="name">Name of your pet</FormLabel>
            <Field as={Input} name="name" type="text" />
          </FormControl>
          <Flex direction="row" gap="10">
            <FormControl>
              <FormLabel htmlFor="age">Age of your pet</FormLabel>
              <Field as={Input} name="age" type="number" />
              <FormErrorMessage>{message}</FormErrorMessage>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="species">Specie of your pet</FormLabel>
              <Select as={Select} placeholder="Select option">
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="turtle">Turtle</option>
              </Select>
            </FormControl>
          </Flex>

          <FormControl>
            <FormLabel htmlFor="description">
              Small description of your pet
            </FormLabel>
            <Field as={Input} name="description" type="text" />
            <FormErrorMessage>{message}</FormErrorMessage>
          </FormControl>

          <Button type="submit" colorScheme="purple" width="full">
            {loading ? (
              <Spinner boxSize="20px" alignSelf="center" />
            ) : (
              <Heading as="h6" size="md">
                Add
              </Heading>
            )}
          </Button>
        </VStack>
      </Form>
    </Formik>
  );
}
