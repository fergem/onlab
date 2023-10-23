import {
  Divider,
  Group,
  Paper,
  Select,
  Stack,
  Table,
  Title,
  Tooltip,
} from "@mantine/core";
import { Calendar } from "@mantine/dates";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import LoadingBoundary from "../components/utility-components/LoadingBoundary";
import { useGetUserUnderTookJobs } from "../hooks/react-query/JobHooks";
import {
  DefaultJobFilterParticipant,
  JobFilterParticipantData,
  JobFunctions,
  JobPreviewWithColor,
  Status,
} from "../models/Job";

export default function UndertookJobs() {
  const [filter, setFilter] = useState(DefaultJobFilterParticipant);
  const { jobs, error, loading, listJobs } = useGetUserUnderTookJobs(filter);

  useEffect(() => {
    listJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const jobsWithColor = useMemo(() => {
    return jobs.map(
      (s) =>
        ({
          ...s,
          color: JobFunctions.generateShadeOfBlue(s.days?.length),
        }) as JobPreviewWithColor
    );
  }, [jobs]);

  const handleSetStatus = (status: string) => {
    setFilter({ status: status as Status });
  };

  const rows = jobsWithColor.map((job) => (
    <tr key={job.id}>
      <td>{job.title}</td>
      <td>{job.type}</td>
      <td>{job.location}</td>
      <td>{dayjs(job.startDate).format("YYYY-MM-DD")}</td>
      <td>{job.endDate ? dayjs(job.endDate).format("YYYY-MM-DD") : "-"}</td>
      <td>{job.days}</td>
    </tr>
  ));

  return (
    <Stack align="center" justify="center">
      <Title order={1}>Undertook jobs board</Title>
      <Select
        value={filter.status}
        onChange={handleSetStatus}
        data={JobFilterParticipantData}
      />
      <Paper p="md" shadow="sm" withBorder>
        <Group w="90%" position="center" align="flex-start" noWrap>
          <Calendar
            size="lg"
            level="month"
            renderDay={(date) => {
              const day = date.getDate();

              return (
                <Tooltip label="asd">
                  <div>{day}</div>
                </Tooltip>
              );
            }}
            getDayProps={(date) => {
              const jobThatDay = jobsWithColor.find((s) =>
                JobFunctions.insideOfDate(date, s.startDate, s.endDate)
              );
              return {
                // onMouseEnter: () => setHovered(date),
                // onMouseLeave: () => setHovered(null),
                selected: !!jobThatDay,

                sx: {
                  "&[data-selected]": {
                    backgroundColor: jobThatDay?.color ?? "blue",
                  },
                },
                // onClick: () => setValue(date),
              };
            }}
          />
          <Divider orientation="vertical" size="sm" />
          <LoadingBoundary
            loading={loading}
            error={error}
            refetch={listJobs}
            withBorder={false}
          >
            <Table highlightOnHover>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Location</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Days</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
          </LoadingBoundary>
        </Group>
      </Paper>
    </Stack>
  );
}
