import { Group, Stack, Text } from "@mantine/core";
import dayjs from "dayjs";
import { UndertookJob } from "../../models/Job";

interface IUndertookJobsPanelProps {
  job: UndertookJob;
}

export default function UndertookJobsDetails({
  job,
}: IUndertookJobsPanelProps) {
  return (
    <Stack align="center">
      <Group position="center" spacing={100}>
        <Stack align="center" spacing={1}>
          <Text fw={800}>Type</Text>
          <Text>{job.type}</Text>
        </Stack>
        <Stack align="center" spacing={1}>
          <Text fw={800}>Start Date</Text>
          <Text>{dayjs(job.startDate).format("YYYY, MMMM D")}</Text>
        </Stack>
        {!job.isRepeated && (
          <Stack align="center" spacing={1}>
            <Text fw={800}>End Date</Text>
            <Text>{dayjs(job.endDate).format("YYYY, MMMM D")}</Text>
          </Stack>
        )}
        {job.isRepeated && (
          <Stack align="center" spacing={1}>
            <Text fw={800}>Days</Text>
            <Text>{job.days?.join(",")}</Text>
          </Stack>
        )}
      </Group>
      <Stack align="center" spacing={1} w="70%">
        <Text fw={800}>Description</Text>
        <Text>{job.description}</Text>
      </Stack>
    </Stack>
  );
}
