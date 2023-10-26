import {
  Box,
  Center,
  Drawer,
  SegmentedControl,
  Stack,
  Text,
} from "@mantine/core";
import { IconHome, IconInfoCircle } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/react-query/AuthHooks";
import useDrawer from "../../hooks/useDrawer";
import { UserRole } from "../../models/User";
import ApplicationsPetSitter from "../../pages/ApplicationsPetSitter";

export default function MessagesDrawer() {
  const { opened, close } = useDrawer();
  const { user } = useAuth();
  const [value, setValue] = useState<UserRole | undefined>();

  const handleSetValue = (newVal: string) => {
    setValue(newVal as UserRole);
  };

  useEffect(() => {
    const newVal = user?.roles.find((s) => s === UserRole.Owner)
      ? UserRole.Owner
      : UserRole.PetSitter;
    setValue(newVal);
  }, [user?.roles]);

  const UserRoleData = [
    {
      label: (
        <Center>
          <IconHome size="1.5rem" />
          <Box ml={10}>{UserRole.Owner}</Box>
        </Center>
      ),
      value: UserRole.Owner,
      disabled: !user?.roles.find((s) => s === UserRole.Owner),
    },
    {
      label: (
        <Center>
          <IconInfoCircle size="1.5rem" />
          <Box ml={10}>{UserRole.PetSitter}</Box>
        </Center>
      ),
      value: UserRole.PetSitter,
      disabled: !user?.roles.find((s) => s === UserRole.PetSitter),
    },
  ];

  return (
    <Drawer
      position="right"
      opened={opened}
      onClose={close}
      size="md"
      keepMounted
      title={
        <Text fw={600} fz={30}>
          Messages
        </Text>
      }
    >
      <Stack>
        <SegmentedControl
          onChange={handleSetValue}
          value={value}
          data={UserRoleData}
        />
        {value === UserRole.PetSitter && <ApplicationsPetSitter />}
      </Stack>
    </Drawer>
  );
}
