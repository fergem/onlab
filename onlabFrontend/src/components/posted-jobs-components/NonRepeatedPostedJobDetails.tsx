import { Group, Stack, Text } from "@mantine/core";
import dayjs from "dayjs";
import { PostedJob } from "../../models/Job";

interface INonRepeatedPostedJobDetailsProps {
  job: PostedJob;
}

export default function NonRepeatedPostedJobDetails({
  job,
}: INonRepeatedPostedJobDetailsProps) {
  return (
    <Group position="center" spacing={100}>
      <Stack align="center" spacing={1}>
        <Text fw={800}>Type</Text>
        <Text>{job.type}</Text>
      </Stack>
      <Stack align="center" spacing={1}>
        <Text fw={800}>Description</Text>
        <Text lineClamp={5}>{job.description}</Text>
      </Stack>
      <Stack align="center" spacing={1}>
        <Text fw={800}>Date</Text>
        <Text>
          {dayjs(job.startDate).format("YYYY, MMMM D")}-
          {dayjs(job.endDate).format("MMMM D")}
        </Text>
      </Stack>
    </Group>
  );
}
