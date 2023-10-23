import { ActionIcon, Group, Tooltip } from "@mantine/core";
import { IconCheck, IconMessages, IconX } from "@tabler/icons-react";
import { useApproveApplicationForJob } from "../../hooks/react-query/JobApplicationHooks";

interface IJobActionsNonApprovedProps {
  isJobAvailable: boolean;
  applicationID: number;
}
export default function JobActionsNotApproved({
  isJobAvailable,
  applicationID,
}: IJobActionsNonApprovedProps) {
  const { approveJob } = useApproveApplicationForJob();

  const handleApprove = () => {
    approveJob(applicationID);
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
          onClick={() => {}}
        >
          <IconMessages />
        </ActionIcon>
      </Tooltip>
    </Group>
  );
}
