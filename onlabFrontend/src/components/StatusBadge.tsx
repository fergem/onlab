import { Badge } from "@chakra-ui/react";
import Status from "../models/Status";

interface IPropsStatusBadge {
  status: Status;
}

export const StatusBadge: React.FC<IPropsStatusBadge> = ({ status }) => {
  if (status.name == "Done")
    return (
      <Badge colorScheme="green" px="4vh" py="0.5vh" fontSize="0.8em">
        {status.name}
      </Badge>
    );
  else if (status.name == "Available")
    return (
      <Badge colorScheme="yellow" px="4vh" py="0.5vh" fontSize="0.8em">
        {status.name}
      </Badge>
    );
  else
    return (
      <Badge colorScheme="blue" px="4vh" py="0.5vh" fontSize="0.8em">
        {status.name}
      </Badge>
    );
};
