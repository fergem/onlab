import { Flex } from "@chakra-ui/react";
import LoginForm from "../components/LoginForm";

export default function Login() {
  return (
    <Flex
      px="40%"
      justify="center"
      direction="column"
      gap="7"
      py="15%"
      textAlign="center">
      <LoginForm />
    </Flex>
  );
}
