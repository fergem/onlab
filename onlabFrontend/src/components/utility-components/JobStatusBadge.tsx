import { Badge, Tooltip } from "@mantine/core";
import { Status } from "../../models/Job";

interface IPropsStatusBadge {
  status: Status;
  ml?: string;
}

export default function JobStatusBadge({
  status,
  ml = "0",
}: IPropsStatusBadge) {
  switch (status) {
    case Status.Available:
      return (
        <Tooltip label="Status of job">
          <Badge color="green" size="sm" variant="filled" ml={ml}>
            Available
          </Badge>
        </Tooltip>
      );
    case Status.Upcoming:
      return (
        <Tooltip label="Status of job">
          <Badge color="blue" size="sm" variant="filled" ml={ml}>
            Upcoming
          </Badge>
        </Tooltip>
      );
    case Status.Done:
      return (
        <Tooltip label="Status of job">
          <Badge color="indigo" size="sm" variant="filled" ml={ml}>
            Done
          </Badge>
        </Tooltip>
      );
    case Status.Canceled:
      return (
        <Tooltip label="Status of job">
          <Badge color="red" size="sm" variant="filled" ml={ml}>
            Done
          </Badge>
        </Tooltip>
      );
    default:
      <div />;
  }
}
