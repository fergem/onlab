import {
  Flex,
  Heading,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { color, selectedColor } from "../utility/Constants";
import OwnerProfile from "../components/OwnerProfile";
import PetSitterProfile from "../components/PetSitterProfile";

export default function Profile() {
  return (
    <Flex
      px="20%"
      direction="column"
      gap="7"
      py="2%"
      textAlign="center"
      h="inherit">
      <Heading as="h1" size="lg">
        Your Profile
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
        <Flex direction="column" grow="2">
          <Tabs
            align="center"
            variant="enclosed"
            textColor={color}
            borderColor={selectedColor}>
            <TabList>
              <Tab _selected={{ bg: selectedColor }} fontSize="md">
                Owner Profile
              </Tab>
              <Tab _selected={{ bg: selectedColor }} fontSize="md">
                Petsitter Profile
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <OwnerProfile></OwnerProfile>
              </TabPanel>
              <TabPanel>
                <PetSitterProfile></PetSitterProfile>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Flex>
    </Flex>
  );
}
