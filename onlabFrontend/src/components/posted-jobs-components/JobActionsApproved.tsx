import { ActionIcon, Group, Tooltip } from "@mantine/core";
import { IconMessages, IconX } from "@tabler/icons-react";
import useDrawer from "../../hooks/useDrawer";

interface IJobActionsApprovedProps {
  isJobDone: boolean;
  applicationID: number;
}
export default function JobActionsApproved({
  isJobDone,
  applicationID,
}: IJobActionsApprovedProps) {
  const { open } = useDrawer();
  const handleOpenMessages = () => {
    open();
  };
  return (
    <Group position="center">
      {!isJobDone && (
        <Tooltip label="Cancel user">
          <ActionIcon
            color="red"
            size="md"
            variant="outline"
            p={4}
            onClick={() => {}}
          >
            <IconX />
          </ActionIcon>
        </Tooltip>
      )}
      <Tooltip label="Open messages">
        <ActionIcon
          color="blue"
          size="md"
          variant="outline"
          p={4}
          onClick={handleOpenMessages}
        >
          <IconMessages />
        </ActionIcon>
      </Tooltip>
    </Group>
  );
}
