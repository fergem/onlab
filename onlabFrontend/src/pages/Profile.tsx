import {
  Grid,
  Group,
  ScrollArea,
  Stack,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import { IconBallFootball, IconPaw, IconUser } from "@tabler/icons-react";
import ProfilePicture from "../components/ProfilePicture";
import AddPet from "../components/pet-components/AddPet";
import PetListLoadingPets from "../components/pet-components/PetList";
import { useAuth } from "../hooks/AuthHooks";

export default function Profile() {
  const { user } = useAuth();

  return (
    <Stack h="100%" justify="center" ml="5%" mr="10%">
      <Tabs
        variant="outline"
        defaultValue="profile"
        orientation="vertical"
        h="80%"
      >
        <Tabs.List grow>
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

        <Tabs.Panel
          value="profile"
          sx={() => ({
            borderRight: "solid lightgrey 1px",
            borderTop: "solid lightgrey 1px",
            borderBottom: "solid lightgrey 1px",
          })}
          p="3%"
        >
          <Grid align="center" justify="center" gutter="lg" h="100%">
            <Grid.Col span={5}>
              <ProfilePicture />
            </Grid.Col>
            <Grid.Col span={6}>
              <Stack>
                <Text size="xl">
                  <b> Username:</b>{" "}
                  {user?.userName ??
                    "You've got no username consider adding one"}
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
            </Grid.Col>
          </Grid>
        </Tabs.Panel>

        <Tabs.Panel
          value="owner"
          sx={() => ({
            borderRight: "solid lightgrey 1px",
            borderTop: "solid lightgrey 1px",
            borderBottom: "solid lightgrey 1px",
          })}
          p="3%"
        >
          <Grid align="center" justify="center" gutter="lg" h="100%">
            <Grid.Col span={8} h="100%">
              <Group align="center" position="center" mb="5px">
                <Title order={3} align="center">
                  Your pets
                </Title>
                <AddPet />
              </Group>

              <ScrollArea h="100%" offsetScrollbars>
                <PetListLoadingPets />
              </ScrollArea>
            </Grid.Col>
            <Grid.Col span="auto">
              <Stack>
                <Text size="xl">
                  <b> Description:</b>
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
            </Grid.Col>
          </Grid>
        </Tabs.Panel>

        <Tabs.Panel
          value="petsiter"
          sx={() => ({
            borderRight: "solid lightgrey 1px",
            borderTop: "solid lightgrey 1px",
            borderBottom: "solid lightgrey 1px",
          })}
          p="3%"
        >
          <p>three!</p>
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
}
