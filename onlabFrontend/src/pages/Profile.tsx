import { Container, Group, Stack, Tabs, Text, Title } from "@mantine/core";
import { IconBallFootball, IconPaw, IconUser } from "@tabler/icons-react";
import ProfilePicture from "../components/ProfilePicture";
import { useAuth } from "../hooks/AuthHooks";
import PetList from "../components/pet-components/PetList";

export default function Profile() {
  const { user } = useAuth();

  return (
    <Container>
      <Tabs
        variant="outline"
        radius="md"
        defaultValue="profile"
        orientation="vertical"
      >
        <Tabs.List>
          <Tabs.Tab value="profile" icon={<IconUser />}>
            Profile
          </Tabs.Tab>
          <Tabs.Tab value="owner" icon={<IconPaw />}>
            Owner Profile
          </Tabs.Tab>
          <Tabs.Tab value="petsiter" icon={<IconBallFootball />}>
            PetSitter Profile
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="profile">
          <Group align="center" position="center">
            <ProfilePicture />
            <Stack>
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
                {user?.lastName ??
                  "You've got no last name consider adding one"}
              </Text>
            </Stack>
          </Group>
        </Tabs.Panel>

        <Tabs.Panel value="owner">
          <Stack align="center" justify="center">
            <Stack>
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
            </Stack>
            <Title order={3} align="center">
              Your pets
            </Title>
            <PetList isAddingPet />
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="petsiter">
          <p>three!</p>
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
}
