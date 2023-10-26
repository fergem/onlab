import { ActionIcon, Group, Tooltip } from "@mantine/core";
import { IconCheck, IconMessages, IconX } from "@tabler/icons-react";
import { useApproveApplicationForJob } from "../../hooks/react-query/JobApplicationHooks";
import useDrawer from "../../hooks/useDrawer";

interface IJobActionsNonApprovedProps {
  isJobAvailable: boolean;
  applicationID: number;
}
export default function JobActionsNotApproved({
  isJobAvailable,
  applicationID,
}: IJobActionsNonApprovedProps) {
  const { approveJob } = useApproveApplicationForJob();
  const { open } = useDrawer();

  const handleApprove = () => {
    approveJob(applicationID);
  };
  const handleOpenMessages = () => {
    open();
  };
  return (
    <Group position="center">
      {isJobAvailable && (
        <Tooltip label="Approve user">
          <ActionIcon
            color="green"
            size="md"
            variant="outline"
            p={4}
            onClick={handleApprove}
          >
            <IconCheck />
          </ActionIcon>
        </Tooltip>
      )}
      {isJobAvailable && (
        <Tooltip label="Decline user">
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
