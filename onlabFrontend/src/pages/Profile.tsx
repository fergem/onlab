import {
  Box,
  Flex,
  Heading,
  Image,
  ListItem,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  UnorderedList,
} from "@chakra-ui/react";
import { JobCard } from "../components/JobCard";
import { jobs } from "../models/DummyData";
import { color, selectedColor } from "../utility/Constants";

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
        <Image
          borderRadius="lg"
          boxSize="300px"
          objectFit="cover"
          src="https://i.pinimg.com/550x/8f/6d/5c/8f6d5c365c7c29d9dab1ad219ca8eb70.jpg"
          alt="Your Profile"
        />
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
                <UnorderedList>
                  <ListItem>Lorem ipsum dolor sit amet</ListItem>
                  <ListItem>Consectetur adipiscing elit</ListItem>
                  <ListItem>Integer molestie lorem at massa</ListItem>
                  <ListItem>Facilisis in pretium nisl aliquet</ListItem>
                </UnorderedList>
              </TabPanel>
              <TabPanel>
                <UnorderedList>
                  <ListItem>Lorem ipsum dolor sit amet</ListItem>
                  <ListItem>Consectetur adipiscing elit</ListItem>
                  <ListItem>Integer molestie lorem at massa</ListItem>
                  <ListItem>Facilisis in pretium nisl aliquet</ListItem>
                </UnorderedList>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Flex>
      <Heading as="h2" size="md">
        Your current Jobs available:
      </Heading>
      {jobs.map((x) => (
        <JobCard key={x.id} job={x} />
      ))}
    </Flex>
  );
}
