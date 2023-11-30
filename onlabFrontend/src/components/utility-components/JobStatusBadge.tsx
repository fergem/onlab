import { Badge, Tooltip } from "@mantine/core";
import { Status } from "../../models/Job";

interface IPropsStatusBadge {
  status: Status;
}

export default function JobStatusBadge({ status }: IPropsStatusBadge) {
  switch (status) {
    case Status.Available:
      return (
        <Tooltip label="Status of job">
          <Badge color="blue" size="sm" variant="filled" w="100px">
            Available
          </Badge>
        </Tooltip>
      );
    case Status.Upcoming:
      return (
        <Tooltip label="Status of job">
          <Badge color="green" size="sm" variant="filled" w="100px">
            Upcoming
          </Badge>
        </Tooltip>
      );
    case Status.Done:
      return (
        <Tooltip label="Status of job">
          <Badge color="indigo" size="sm" variant="filled" w="100px">
            Done
          </Badge>
        </Tooltip>
      );
    case Status.Canceled:
      return (
        <Tooltip label="Status of job">
          <Badge color="gray" size="sm" variant="filled" w="100px">
            Canceled
          </Badge>
        </Tooltip>
      );
    default:
      <div />;
  }
}
