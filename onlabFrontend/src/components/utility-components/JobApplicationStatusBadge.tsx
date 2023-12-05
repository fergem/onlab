import { Badge, Tooltip } from "@mantine/core";
import { JobApplicationStatus } from "../../models/JobApplication";

interface IPropsStatusBadge {
  status: JobApplicationStatus;
}

export default function JobApplicationStatusBadge({
  status,
}: IPropsStatusBadge) {
  switch (status) {
    case JobApplicationStatus.Approving:
      return (
        <Tooltip label="Status of application">
          <Badge color="blue" size="sm" variant="filled" w="100px">
            Approving
          </Badge>
        </Tooltip>
      );
    case JobApplicationStatus.Approved:
      return (
        <Tooltip label="Status of application">
          <Badge color="green" size="sm" variant="filled" w="100px">
            Approved
          </Badge>
        </Tooltip>
      );
    case JobApplicationStatus.NotApproved:
      return (
        <Tooltip label="Status of application">
          <Badge color="red" size="sm" variant="filled" w="100px">
            Not Approved
          </Badge>
        </Tooltip>
      );
    case JobApplicationStatus.Canceled:
      return (
        <Tooltip label="Status of application">
          <Badge color="gray" size="sm" variant="filled" w="100px">
            Canceled
          </Badge>
        </Tooltip>
      );
    default:
      <div />;
  }
}
