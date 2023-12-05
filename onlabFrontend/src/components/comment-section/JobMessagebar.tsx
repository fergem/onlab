import { Group, Stack, Text } from "@mantine/core";
import dayjs from "dayjs";
import { PostedJob } from "../../models/Job";
import JobStatusBadge from "../utility-components/JobStatusBadge";

interface IMessagebarProps {
  job: PostedJob;
  select(jobID: number): void;
}

export default function JobMessagebar({ job, select }: IMessagebarProps) {
  const handleOnClick = () => {
    select(job.id);
  };

  return (
    <Group
      align="center"
      noWrap
      onClick={handleOnClick}
      sx={(theme) => ({
        "&:hover": {
          color: "white",
          backgroundColor: theme.colors.blue[6],
        },
        borderRadius: "10px",
      })}
      px="sm"
      py="sm"
      position="apart"
    >
      <Stack spacing={0}>
        <Text fw={1000} fz={15} lineClamp={2}>
          {job.title}
        </Text>
        <Group spacing={0}>
          {job.endDate ? (
            <>
              <Text fw={400} fz={13}>
                {dayjs(job.startDate).format("MMM D.")}
              </Text>
              -
              <Text fw={400} fz={13}>
                {dayjs(job.startDate).format("MMM D.")}
              </Text>
            </>
          ) : (
            <Text fw={400} fz={13}>
              {job.days?.join(", ")}
            </Text>
          )}
        </Group>
      </Stack>
      <JobStatusBadge status={job.status} />
    </Group>
  );
}
