import { Flex, Heading, Image } from "@chakra-ui/react";
import { UserService } from "../services/UserService";
import { useState, useEffect } from "react";
import User from "../models/User";

export default function Profile() {
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  useEffect(() => {
    const user = UserService.getCurrentUser();
    console.log(JSON.stringify(user));
    if (user) {
      setCurrentUser(user);
    }
  }, []);
  return (
    <Flex
      px="20%"
      direction="column"
      gap="7"
      py="2%"
      textAlign="center"
      h="inherit">
      <Heading as="h1" size="lg">
        {currentUser?.userName}'s Profile
      </Heading>
      <Flex direction="row" w="inherit" gap="2">
        <Flex direction="column">
          <Image
            borderRadius="lg"
            boxSize="300px"
            objectFit="cover"
            src="https://i.pinimg.com/550x/8f/6d/5c/8f6d5c365c7c29d9dab1ad219ca8eb70.jpg"
            alt="Your Profile"
          />
        </Flex>
        <div>
          <p>
            <strong>Id:</strong> {currentUser?.id}
          </p>
          <p>
            <strong>Name:</strong>{" "}
            {currentUser?.firstName + " " + currentUser?.lastName}
          </p>
        </div>
      </Flex>
    </Flex>
  );
}
