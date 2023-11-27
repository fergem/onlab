import { Badge, Tooltip } from "@mantine/core";
import { JobApplicationStatus } from "../../models/JobApplication";

interface IPropsStatusBadge {
  status: JobApplicationStatus;
  ml?: string;
}

export default function JobStatusBadge({
  status,
  ml = "10",
}: IPropsStatusBadge) {
  switch (status) {
    case JobApplicationStatus.Approving:
      return (
        <Tooltip label="Status of application">
          <Badge color="green" size="sm" variant="filled" ml={ml}>
            Approving
          </Badge>
        </Tooltip>
      );
    case JobApplicationStatus.Approved:
      return (
        <Tooltip label="Status of application">
          <Badge color="blue" size="sm" variant="filled" ml={ml}>
            Approved
          </Badge>
        </Tooltip>
      );
    case JobApplicationStatus.Canceled:
      return (
        <Tooltip label="Status of application">
          <Badge color="red" size="sm" variant="filled" ml={ml}>
            Canceled
          </Badge>
        </Tooltip>
      );
    default:
      <div />;
  }
}
