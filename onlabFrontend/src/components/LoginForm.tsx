import {
  Button,
  Card,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthHooks";
import { LoginModel } from "../models/User";

export default function LoginForm() {
  let navigate: NavigateFunction = useNavigate();
  const { loginUser } = useAuth();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<LoginModel>();

  const handleLogin = (loginModel: LoginModel) => {
    loginUser(loginModel).then(
      () => {
        navigate("/jobs");
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
        <form onSubmit={handleSubmit(handleLogin)}>
          <Flex
            direction="row"
            alignItems="center"
            justifyContent="space-evenly">
            <Flex direction="column">
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
