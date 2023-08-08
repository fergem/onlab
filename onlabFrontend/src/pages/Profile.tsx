import {
  Button,
  Flex,
  Heading,
  Image,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useGetUserPets } from "../hooks/UserHooks";
import { WarningIcon } from "@chakra-ui/icons";
import CreatePet from "../components/pet-components/CreatePet";
import ProfilePicture from "../components/ProfilePicture";
import { useAuth } from "../hooks/AuthHooks";
import { PetList } from "../components/pet-components/PetList";

export default function Profile() {
  const { user } = useAuth();

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
        <Button color="cyan" size="md" onClick={() => refetch()}>
          Click me to try again!
        </Button>
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
        <ProfilePicture></ProfilePicture>
        <Flex
          direction="column"
          w="100%"
          gap="2"
          color="#505168"
          alignItems="center">
          <Tabs variant="soft-rounded" colorScheme="yellow">
            <TabList justifyContent="center" alignItems="center">
              <Tab>Profile</Tab>
              <Tab>Owner Profile</Tab>
              <Tab>PetSitter Profile</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Text fontSize="xl">
                  <b> Username:</b>{" "}
                  {user?.userName ??
                    "You've got no username consider adding one"}
                </Text>
                <Text fontSize="xl">
                  <b> First Name:</b>{" "}
                  {user?.firstName ??
                    "You've got no first name consider adding one"}
                </Text>

                <Text fontSize="xl">
                  <b> Last Name:</b>{" "}
                  {user?.lastName ??
                    "You've got no last name consider adding one"}
                </Text>
              </TabPanel>
              <TabPanel>
                <Text fontSize="xl">
                  <b> Description:</b>{" "}
                  {user?.ownerProfile?.minWage ??
                    "You've got no name consider adding one"}
                </Text>
                <Text fontSize="xl">
                  <b> Minimum required experience for job: </b>
                  {user?.ownerProfile?.minRequiredExperience ??
                    "You've got no name consider adding one"}
                </Text>

                <Text fontSize="xl">
                  <b> Default Wage:</b>{" "}
                  {user?.ownerProfile?.minWage ??
                    "You've got no name consider adding one"}
                </Text>
              </TabPanel>
              <TabPanel>
                <p>three!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Flex>

      <Flex direction="row" borderBottom="1px" pb="1%" justifyContent="center">
        <Heading size="lg">Your pets</Heading>
        <CreatePet></CreatePet>
      </Flex>

      {pets.length > 0 ? (
        petItems
      ) : (
        <Heading size="lg">
          You've currently got no pets. Consider adding one to your profile with
          the <em>Add pet</em> button.
        </Heading>
      )}
    </Flex>
  );
}
