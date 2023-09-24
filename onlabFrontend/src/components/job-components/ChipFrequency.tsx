import { Chip, Group, Stack, Text } from "@mantine/core";
import { IconCalendarEvent, IconCalendarRepeat } from "@tabler/icons-react";
import { Frequency, JobType } from "../../models/Job";
import { IChipFrequencyProps } from "./JobHomeFilter";

export default function ChipFrequency({
  jobType,
  handleSetRepeatable,
}: IChipFrequencyProps) {
  if (jobType === JobType.Boarding || jobType === JobType.Sitting) return;
  return (
    <Chip.Group defaultValue={Frequency.Once} onChange={handleSetRepeatable}>
      <Stack spacing={3}>
        <Text fz="sm" fw={500} align="center">
          How often do you need this service?
        </Text>
        <Group position="center" align="center">
          <Chip value={Frequency.Once} size="md" radius="sm">
            <IconCalendarEvent />
            <Text ml="sm">Once</Text>
          </Chip>
          <Chip value={Frequency.Repeat} size="md" radius="sm">
            <IconCalendarRepeat />
            <Text ml="sm">Repeat</Text>
          </Chip>
        </Group>
      </Stack>
    </Chip.Group>
  );
}
