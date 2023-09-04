import CreatePet from "../components/pet-components/CreatePet";
import ProfilePicture from "../components/ProfilePicture";
import { useAuth } from "../hooks/AuthHooks";
import PetList from "../components/pet-components/PetList";
import { Container, Group, Stack, Tabs, Text, Title } from "@mantine/core";
import { IconBallFootball, IconPaw, IconUser } from "@tabler/icons-react";

export default function Profile() {
  const { user } = useAuth();

  return (
    <Container>
      <Group align="top">
        <ProfilePicture></ProfilePicture>
        <Tabs variant="outline" radius="md" defaultValue="gallery">
          <Tabs.List>
            <Tabs.Tab value="profile" icon={<IconUser></IconUser>}>
              Profile
            </Tabs.Tab>
            <Tabs.Tab value="owner" icon={<IconPaw></IconPaw>}>
              Owner Profile
            </Tabs.Tab>
            <Tabs.Tab
              value="petsiter"
              icon={<IconBallFootball></IconBallFootball>}>
              PetSitter Profile
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="profile">
            <Text size="xl">
              <b> Username:</b>{" "}
              {user?.userName ?? "You've got no username consider adding one"}
            </Text>
            <Text size="xl">
              <b> First Name:</b>{" "}
              {user?.firstName ??
                "You've got no first name consider adding one"}
            </Text>

            <Text size="xl">
              <b> Last Name:</b>{" "}
              {user?.lastName ?? "You've got no last name consider adding one"}
            </Text>
          </Tabs.Panel>
          <Tabs.Panel value="owner">
            <Text size="xl">
              <b> Description:</b>{" "}
              {user?.ownerProfile?.minWage ??
                "You've got no name consider adding one"}
            </Text>
            <Text size="xl">
              <b> Minimum required experience for job: </b>
              {user?.ownerProfile?.minRequiredExperience ??
                "You've got no name consider adding one"}
            </Text>

            <Text size="xl">
              <b> Default Wage:</b>{" "}
              {user?.ownerProfile?.minWage ??
                "You've got no name consider adding one"}
            </Text>
          </Tabs.Panel>
          <Tabs.Panel value="petsiter">
            <p>three!</p>
          </Tabs.Panel>
        </Tabs>
      </Group>

      <Stack pb="1%" justify="center">
        <Title order={4}>Your pets</Title>
        <CreatePet></CreatePet>
      </Stack>

      <PetList></PetList>
    </Container>
  );
}
