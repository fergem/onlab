import { Badge } from "@mantine/core";
import { StatusName } from "../models/Status";

interface IPropsStatusBadge {
  status: StatusName;
}

export default function StatusBadge({ status }: IPropsStatusBadge) {
  switch (status) {
    case StatusName.WaitingForApproval:
      return (
        <Badge color="cyan" size="xl" variant="filled">
          Waiting for Approoval
        </Badge>
      );
    case StatusName.Inprogress:
      return (
        <Badge color="indigo" size="xl" variant="filled">
          In Progress
        </Badge>
      );
    case StatusName.Done:
      return (
        <Badge color="green" size="xl" variant="filled">
          Done
        </Badge>
      );
    default:
      <div />;
  }
}
