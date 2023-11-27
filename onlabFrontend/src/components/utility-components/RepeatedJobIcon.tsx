import { Tooltip } from "@mantine/core";
import { IconCalendarRepeat } from "@tabler/icons-react";

export default function RepeatedJobIcon() {
  return (
    <Tooltip label="Repeated job">
      <IconCalendarRepeat />
    </Tooltip>
  );
}
