import { Group, Stack, Text } from "@mantine/core";
import { PostedJob } from "../../models/Job";

interface IMessagebarProps {
  job: PostedJob;
  select(applicationID: number): void;
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
        ":hover": {
          backgroundColor: theme.colors.blue[4],
        },
        borderRadius: "10px",
      })}
      px="sm"
      py="sm"
    >
      <Stack spacing={0}>
        <Text fw={1000} fz={17} lineClamp={2}>
          {job.title}
        </Text>
      </Stack>
    </Group>
  );
}
