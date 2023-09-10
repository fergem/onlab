import {
  Box,
  Button,
  Center,
  Container,
  MultiSelect,
  Paper,
  RangeSlider,
  Select,
  Stack,
  Text,
} from "@mantine/core";
import { useState } from "react";
import { JobParameters } from "../../models/Job";
import { getPetSpeciesValueLabel } from "../../models/Pet";
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
        <Text fz="md" align="left">
          Search for:
        </Text>
        <Stack justify="center" spacing="xl">
          <Select
            onChange={handleSelectChange}
            data={selectData}
            radius="md"
            transitionProps={{
              transition: "pop-top-left",
              duration: 80,
              timingFunction: "ease",
            }}
          />
          <MultiSelect
            data={getPetSpeciesValueLabel()}
            label="Experience in"
            placeholder="Pick animals"
          />
          <Box>
            <Text fz="sm">Hours</Text>
            <RangeSlider
              defaultValue={[1, 12]}
              marks={[
                { value: 1, label: "1" },
                { value: 12, label: "12" },
              ]}
              min={1}
              max={12}
              minRange={1}
              onChange={handleHoursRangeChange}
            />
          </Box>
          <Button onClick={handleFilters}>Apply filters</Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default JobFilter;
