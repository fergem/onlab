import {
  Box,
  Button,
  Center,
  Container,
  Paper,
  RangeSlider,
  Select,
  Stack,
  Text,
} from "@mantine/core";
import { useState } from "react";
import { JobParameters } from "../../models/Job";
import { StatusName } from "../../models/Status";

interface IProp {
  jobFilter: JobParameters;
  setJobFilter(jobParameter: JobParameters): void;
  refetch(): void;
}

const JobFilter: React.FC<IProp> = ({ jobFilter, setJobFilter, refetch }) => {
  const [range, setRange] = useState<number[]>([0, 12]);
  const [value, setValue] = useState(jobFilter.statusName);
  const handleHoursRangeChange = (val: number[]) => {
    setRange(val);
    setJobFilter({
      ...jobFilter,
      jobHoursRange: {
        minHours: range[0],
        maxHours: range[1],
      },
    });
  };
  const handleSelectChange = (event: string) => {
    setValue(event as StatusName);
    setJobFilter({
      ...jobFilter,
      statusName: event as StatusName,
    });
  };
  const handleFilters = () => {
    refetch();
  };
  const selectData = [
    { value: StatusName.Available, label: "Available" },
    { value: StatusName.WaitingForApproval, label: "Waiting For Approval" },
    { value: StatusName.Inprogress, label: "In Progress" },
  ];
  return (
    <Container>
      <Paper shadow="sm" p="sm" withBorder>
        <Stack justify="center" align="center">
          <Text>
            {range[0]}-{range[1]}
          </Text>
          <Box miw="100%">
            <RangeSlider
              defaultValue={[0, 12]}
              min={0}
              max={12}
              step={1}
              onChange={handleHoursRangeChange}
            />
          </Box>

          <Select
            onChange={handleSelectChange}
            data={selectData}
            transitionProps={{
              transition: "pop-top-left",
              duration: 80,
              timingFunction: "ease",
            }}
          />
          <Button onClick={handleFilters}>Apply filters</Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default JobFilter;
