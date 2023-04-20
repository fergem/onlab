import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserService } from "../services/UserService";

export default function LoginForm() {
  let navigate: NavigateFunction = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });

  const initialValues: {
    username: string;
    password: string;
  } = {
    username: "",
    password: "",
  };

  const handleCreatePet = (formValue: {
    username: string;
    password: string;
  }) => {
    const { username, password } = formValue;
    setMessage("");
    setLoading(true);

    UserService.login(username, password).then(
      () => {
        navigate("/profile");
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
    <Flex align="center" justify="center">
      <Box bg="white" p={6} rounded="md" w={64}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleCreatePet}
          validationSchema={validationSchema}>
          <Form>
            <VStack spacing={4} align="flex-start">
              <FormControl>
                <FormLabel htmlFor="username">Username</FormLabel>
                <Field as={Input} name="username" type="text" />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Field as={Input} name="password" type="password" />
                <FormErrorMessage>{message}</FormErrorMessage>
              </FormControl>
              <Button type="submit" colorScheme="purple" width="full">
                {loading ? (
                  <Spinner boxSize="20px" alignSelf="center" />
                ) : (
                  <Heading as="h6" size="md">
                    Login
                  </Heading>
                )}
              </Button>
            </VStack>
          </Form>
        </Formik>
      </Box>
    </Flex>
  );
}
