import { Badge } from "@mantine/core";
import { Status } from "../models/Job";

interface IPropsStatusBadge {
  status: Status;
}

export default function StatusBadge({ status }: IPropsStatusBadge) {
  switch (status) {
    case Status.WaitingForApproval:
      return (
        <Badge color="cyan" size="xl" variant="filled">
          Waiting for Approval
        </Badge>
      );
    case Status.Inprogress:
      return (
        <Badge color="indigo" size="xl" variant="filled">
          In Progress
        </Badge>
      );
    case Status.Done:
      return (
        <Badge color="green" size="xl" variant="filled">
          Done
        </Badge>
      );
    default:
      <div />;
  }
}
