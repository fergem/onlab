import { useForm } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  FormErrorMessage,
  Card,
} from "@chakra-ui/react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthHooks";
import User, { RegisterModel } from "../models/User";

export default function RegisterForm() {
  let navigate: NavigateFunction = useNavigate();
  const { registerUser } = useAuth();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<RegisterModel>();

  const handleRegister = (registerModel: RegisterModel) => {
    registerUser(registerModel).then(
      () => {
        navigate("/login");
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  };

  return (
    <Flex justify="center" textAlign="center" alignItems="center">
      <Card
        boxShadow="dark-lg"
        borderRadius="xl"
        color="#505168"
        boxSize="fit-content"
        p="10%">
        <form onSubmit={handleSubmit(handleRegister)}>
          <Flex
            direction="row"
            alignItems="center"
            justifyContent="space-evenly">
            <Flex direction="column">
              <FormControl isInvalid={!!errors.email}>
                <FormLabel>Email</FormLabel>
                <Input
                  id="email"
                  placeholder="email"
                  type="email"
                  {...register("email", {
                    required: "This is required",
                  })}
                />
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.userName}>
                <FormLabel>Username</FormLabel>
                <Input
                  id="userName"
                  placeholder="Username"
                  {...register("userName", {
                    required: "This is required",
                  })}
                />
                <FormErrorMessage>
                  {errors.userName && errors.userName.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.password}>
                <FormLabel>Password</FormLabel>
                <Input
                  id="password"
                  placeholder="Password"
                  type="password"
                  {...register("password", {
                    required: "This is required",
                  })}
                />
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>

              <Button mt={4} type="submit" isLoading={isSubmitting}>
                Submit
              </Button>
            </Flex>
          </Flex>
          <FormControl></FormControl>
        </form>
      </Card>
    </Flex>
  );
}
