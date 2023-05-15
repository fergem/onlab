import { Flex } from "@chakra-ui/react";
import RegisterForm from "../components/RegisterForm";

export default function Register() {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      direction="row"
      textAlign="center"
      h="inherit">
      <RegisterForm />
    </Flex>
  );
}
