import { Button, Flex, Heading, Image, Spinner, Text } from "@chakra-ui/react";
import { UserService } from "../services/UserService";
import { useState, useEffect } from "react";
import User from "../models/User";
import { PetList } from "../components/PetList";
import { useGetUserPets } from "../hooks/UserHooks";
import { WarningIcon } from "@chakra-ui/icons";
import CreatePet from "../components/CreatePet";

export default function Profile() {
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  useEffect(() => {
    const user = UserService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  let petItems = undefined;
  const [pets, error, loading, refetch] = useGetUserPets();
  useEffect(() => {
    refetch();
  }, []);
  if (loading) {
    petItems = (
      <>
        <Spinner boxSize="100px" marginTop="10%" alignSelf="center" />
        <Heading as="h3" size="sm" marginTop="2%">
          Loading...
        </Heading>
      </>
    );
  } else if (error) {
    petItems = (
      <>
        <WarningIcon
          boxSize="100px"
          marginTop="10%"
          alignSelf="center"></WarningIcon>
        <Heading as="h3" size="sm">
          Error happened
        </Heading>
        <Button onClick={() => refetch()}>Click me to try again!</Button>
      </>
    );
  } else {
    petItems = <PetList pets={pets}></PetList>;
  }

  return (
    <Flex
      px="20%"
      direction="column"
      gap="7"
      py="2%"
      textAlign="center"
      h="inherit">
      <Heading size="lg" borderBottom="1px" pb="1%">
        Your Profile
      </Heading>
      <Flex direction="row" w="inherit" gap="2">
        <Image
          borderRadius="lg"
          boxSize="300px"
          objectFit="cover"
          mr="3rem"
          src="https://i.pinimg.com/550x/8f/6d/5c/8f6d5c365c7c29d9dab1ad219ca8eb70.jpg"
          alt="Your Profile"
        />
        <Flex
          direction="column"
          w="100%"
          gap="2"
          color="#505168"
          alignItems="flex-start">
          <Text fontSize="xl">
            <b> Username:</b>
          </Text>
          <Text fontSize="xl">{currentUser?.userName}</Text>
          <Text fontSize="xl">
            <b> First Name:</b>
          </Text>
          <Text fontSize="xl">
            {currentUser?.firstName ?? "You've got no name"}
          </Text>
          <Text fontSize="xl">
            <b> Last Name:</b>
          </Text>
          <Text fontSize="xl">
            {currentUser?.lastName ?? "You've got no name"}
          </Text>
        </Flex>
      </Flex>

      <Flex direction="row" borderBottom="1px" pb="1%" justifyContent="center">
        <Heading size="lg">Your pets</Heading>
        <CreatePet></CreatePet>
      </Flex>

      <Flex
        direction="row"
        w="100%"
        justifyContent="space-evenly"
        flexWrap="wrap">
        {pets.length > 0 ? (
          petItems
        ) : (
          <Heading size="lg">
            You've currently got no pets. Consider adding one to your profile
            with the <em>Add pet</em> button.
          </Heading>
        )}
      </Flex>
    </Flex>
  );
}
