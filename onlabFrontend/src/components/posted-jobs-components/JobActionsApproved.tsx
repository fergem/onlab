import { ActionIcon, Group, Tooltip } from "@mantine/core";
import { IconMessages, IconX } from "@tabler/icons-react";

interface IJobActionsApprovedProps {
  isJobDone: boolean;
  applicationID: number;
}
export default function JobActionsApproved({
  isJobDone,
  applicationID,
}: IJobActionsApprovedProps) {
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
          onClick={() => {}}
        >
          <IconMessages />
        </ActionIcon>
      </Tooltip>
    </Group>
  );
}
