import { ActionIcon, Group, Tooltip } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { useApproveApplicationForJob } from "../../hooks/react-query/JobApplicationHooks";

interface IJobActionsNonApprovedProps {
  applicationID: number;
}
export default function PostedJobApplicationActions({
  applicationID,
}: IJobActionsNonApprovedProps) {
  const { approveApplication } = useApproveApplicationForJob();
  const handleApprove = () => {
    approveApplication(applicationID);
  };

  return (
    <Group>
      <Tooltip label="Approve sitter">
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
    </Group>
  );
}
