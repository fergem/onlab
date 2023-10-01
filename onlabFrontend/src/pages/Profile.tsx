import { Divider, Group, Paper, Stack, Tabs, Title } from "@mantine/core";
import {
  IconInfoCircle,
  IconKey,
  IconPaw,
  IconUser,
} from "@tabler/icons-react";
import ChangePassword from "../components/ChangePassword";
import EditAdditionalInfo from "../components/EditAdditionalInfo";
import EditUserForm from "../components/EditUserForm";
import ProfilePets from "../components/ProfilePets";
import AddPet from "../components/pet-components/AddPet";
import { useAuth } from "../hooks/AuthHooks";

export default function Profile() {
  const { user } = useAuth();

  return (
    <Tabs defaultValue="profile">
      <Stack justify="center" ml="5%" mr="10%" align="center" spacing={0}>
        <Stack align="center">
          <Tabs.List>
            <Tabs.Tab value="profile" icon={<IconUser />}>
              Profile
            </Tabs.Tab>
            <Tabs.Tab value="password" icon={<IconKey />}>
              Password
            </Tabs.Tab>
            <Tabs.Tab value="pets" icon={<IconPaw />}>
              Pets
            </Tabs.Tab>
            <Tabs.Tab value="additional" icon={<IconInfoCircle />}>
              Additional Info
            </Tabs.Tab>
          </Tabs.List>
        </Stack>

        <Tabs.Panel value="profile" w="60%">
          <Paper shadow="sm" p="xl" withBorder>
            <Title order={3} ml="lg">
              Your profile
            </Title>
            <Divider my="md" />
            <EditUserForm />
          </Paper>
        </Tabs.Panel>
        <Tabs.Panel value="password" w="60%">
          <Paper shadow="sm" p="xl" withBorder>
            <Title order={3} ml="lg">
              Change password
            </Title>
            <Divider my="md" />
            <ChangePassword />
          </Paper>
        </Tabs.Panel>
        <Tabs.Panel value="pets" w="60%">
          <Paper shadow="sm" p="xl" withBorder>
            <Group ml="lg" align="center">
              <Title order={3}>Your pets</Title>
              <AddPet />
            </Group>

            <Divider my="md" />
            <ProfilePets />
          </Paper>
        </Tabs.Panel>
        <Tabs.Panel value="additional" w="60%">
          <Paper shadow="sm" p="xl" withBorder>
            <Title order={3} ml="lg">
              Edit additional information
            </Title>
            <Divider my="md" />
            <EditAdditionalInfo />
          </Paper>
        </Tabs.Panel>

        <Tabs.Panel value="petsitter">
          <p>three!</p>
        </Tabs.Panel>
      </Stack>
    </Tabs>
  );
}
