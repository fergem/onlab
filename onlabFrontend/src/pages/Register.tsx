import { Flex } from "@chakra-ui/react";
import RegisterForm from "../components/RegisterForm";

export default function Login() {
  return (
    <Flex
      px="40%"
      justify="center"
      direction="column"
      gap="7"
      py="15%"
      textAlign="center">
      <RegisterForm />
    </Flex>
  );
}
