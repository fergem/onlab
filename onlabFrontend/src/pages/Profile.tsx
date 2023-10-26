import { Divider, Group, Paper, Stack, Tabs, Text, Title } from "@mantine/core";
import {
  IconHome,
  IconInfoCircle,
  IconKey,
  IconPaw,
  IconUser,
} from "@tabler/icons-react";
import AddPet from "../components/pet-components/AddPet";
import ChangePassword from "../components/user-components/ChangePassword";
import EditOwnerProfile from "../components/user-components/EditOwnerProfile";
import EditPetSitterProfile from "../components/user-components/EditPetSitterProfile";
import EditUserDetails from "../components/user-components/EditUserDetails";
import ProfilePets from "../components/user-components/ProfilePets";
import LoadingBoundary from "../components/utility-components/LoadingBoundary";
import { useAuth } from "../hooks/react-query/AuthHooks";
import { useGetUser, useUpdateUser } from "../hooks/react-query/UserHooks";
import { UpdateOwnerProfileModel } from "../models/OwnerProfile";
import { UpdatePetSitterProfileModel } from "../models/PetSitterProfile";
import { UpdateUserDetailsModel, UserRole } from "../models/User";
import { ArrayFunctions } from "../utility/array";

export default function Profile() {
  const { user } = useAuth();
  const { userDetails, loadingUserDetials, errorUserDetails, getUserDetails } =
    useGetUser();

  const { updateUser } = useUpdateUser();

  const handleUpdateUserDetails = (newDetails: UpdateUserDetailsModel) =>
    updateUser({ ...userDetails, ...newDetails });

  const handleUpdateOwnerProfile = (ownerProfile: UpdateOwnerProfileModel) =>
    updateUser({ ...userDetails, ownerProfile });

  const handldeUpdatePetSitterProfile = (
    petSitterProfile: UpdatePetSitterProfileModel
  ) => updateUser({ ...userDetails, petSitterProfile });
  return (
    <LoadingBoundary
      loading={loadingUserDetials}
      error={errorUserDetails}
      refetch={getUserDetails}
      withBorder
    >
      <Tabs defaultValue="profile">
        <Stack justify="center" ml="5%" mr="10%" align="center" spacing={0}>
          <Stack align="center">
            <Tabs.List>
              <Tabs.Tab value="profile" icon={<IconUser />}>
                Profile details
              </Tabs.Tab>
              <Tabs.Tab value="password" icon={<IconKey />}>
                Password
              </Tabs.Tab>
              {ArrayFunctions.safeIncludes(user?.roles, UserRole.Owner) && (
                <Tabs.Tab value="pets" icon={<IconPaw />}>
                  Pets
                </Tabs.Tab>
              )}
              {ArrayFunctions.safeIncludes(user?.roles, UserRole.Owner) && (
                <Tabs.Tab value="owner" icon={<IconHome />}>
                  Owner Profile
                </Tabs.Tab>
              )}
              {ArrayFunctions.safeIncludes(user?.roles, UserRole.PetSitter) && (
                <Tabs.Tab value="petsitter" icon={<IconInfoCircle />}>
                  Petsitter Profile
                </Tabs.Tab>
              )}
            </Tabs.List>
          </Stack>

          <Tabs.Panel value="profile" w="60%">
            <Paper shadow="sm" p="xl" withBorder>
              <Group ml="lg" position="apart">
                <Title order={3}>Your profile</Title>
                <Title order={4}>
                  Roles: {user?.roles.map((s) => <Text key={s}>{s}</Text>)}
                </Title>
              </Group>
              <Divider my="md" />
              <EditUserDetails
                currentUserDetails={userDetails}
                updateUserDetails={handleUpdateUserDetails}
              />
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
          <Tabs.Panel value="owner" w="60%">
            <Paper shadow="sm" p="xl" withBorder>
              <Title order={3} ml="lg">
                Edit owner profile
              </Title>
              <Divider my="md" />
              <EditOwnerProfile
                currentOwnerProfile={userDetails?.ownerProfile}
                updateOwnerProfile={handleUpdateOwnerProfile}
              />
            </Paper>
          </Tabs.Panel>
          <Tabs.Panel value="petsitter" w="60%">
            <Paper shadow="sm" p="xl" withBorder>
              <Title order={3} ml="lg">
                Edit petsitter profile
              </Title>
              <Divider my="md" />
              <EditPetSitterProfile
                currentPetSitterProfile={userDetails?.petSitterProfile}
                updatePetSitterProfile={handldeUpdatePetSitterProfile}
              />
            </Paper>
          </Tabs.Panel>
        </Stack>
      </Tabs>
    </LoadingBoundary>
  );
}
