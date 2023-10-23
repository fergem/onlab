import { Badge } from "@mantine/core";
import { Status } from "../models/Job";

interface IPropsStatusBadge {
  status: Status;
  ml?: string;
}

export default function JobStatusBadge({ status, ml }: IPropsStatusBadge) {
  switch (status) {
    case Status.Available:
      return (
        <Badge color="green" size="sm" variant="filled" ml={ml}>
          Available
        </Badge>
      );
    case Status.Upcoming:
      return (
        <Badge color="blue" size="sm" variant="filled" ml={ml}>
          Upcoming
        </Badge>
      );
    case Status.Done:
      return (
        <Badge color="indigo" size="sm" variant="filled" ml={ml}>
          Done
        </Badge>
      );
    case Status.Canceled:
      return (
        <Badge color="red" size="sm" variant="filled" ml={ml}>
          Done
        </Badge>
      );
    default:
      <div />;
  }
}
