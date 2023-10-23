import { Group, Stack, Text } from "@mantine/core";
import dayjs from "dayjs";
import { PostedJob } from "../../models/Job";

interface IRepeatedPostedJobDetailsProps {
  job: PostedJob;
}

export default function RepeatedPostedJobDetails({
  job,
}: IRepeatedPostedJobDetailsProps) {
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
        <Text fw={800}>Start Date</Text>
        <Text>{dayjs(job.startDate).format("YYYY, MMMM D")}</Text>
      </Stack>
      <Stack align="center" spacing={1}>
        <Text fw={800}>Days</Text>
        <Text>{job.days?.join(",")}</Text>
        {/* {job.days?.map((s) => <Text key={randomId()}>{s}</Text>)} */}
      </Stack>
    </Group>
  );
}
