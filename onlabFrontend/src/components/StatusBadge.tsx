import { Flex } from "@mantine/core";
import Status from "../models/Status";

interface IPropsStatusBadge {
  status: Status;
}

export default function StatusBadge({ status }: IPropsStatusBadge) {
  if (status.name === "Done") return <Flex>{status.name}</Flex>;
}
