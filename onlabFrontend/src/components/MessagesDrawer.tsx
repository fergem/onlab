import { Drawer, Title } from "@mantine/core";
import useDrawer from "../hooks/useDrawer";

export default function MessagesDrawer() {
  const { opened, close } = useDrawer();

  return (
    <Drawer
      position="right"
      opened={opened}
      onClose={close}
      size="sm"
      title={<Title order={2}>Messages</Title>}
    />
  );
}
