import {
  Button,
  Container,
  MultiSelect,
  Paper,
  Select,
  Stack,
  Text,
} from "@mantine/core";
import { useState } from "react";
import { JobParameters, JobType, getJobTypes } from "../../models/Job";
import { PetSpecies, getPetSpeciesValueLabel } from "../../models/Pet";

interface IJobFilterProps {
  jobFilter: JobParameters;
  setJobFilter(jobParameter: JobParameters): void;
  refetch(): void;
}

export default function JobFilter({
  jobFilter,
  setJobFilter,
  refetch,
}: IJobFilterProps) {
  const [species, setSpecies] = useState<PetSpecies[]>([]);
  const [jobType, setJobType] = useState<JobType>();
  const handleFilters = () => {
    refetch();
  };

  const handleSpeciesFilter = (data: PetSpecies[]) => {
    setSpecies(data);
  };

  const handleJobTypeFilter = (data: string) => {
    setJobType(data as JobType);
  };

  return (
    <Container>
      <Paper shadow="sm" p="sm" withBorder>
        <Text fz="md" align="left">
          Search for:
        </Text>

        <Stack justify="center" spacing="xl">
          <MultiSelect
            onChange={handleSpeciesFilter}
            data={getPetSpeciesValueLabel()}
            label="Service for:"
            placeholder="Pick animals"
            radius="md"
            transitionProps={{
              transition: "pop-top-left",
              duration: 80,
              timingFunction: "ease",
            }}
          />
          <Select
            onChange={handleJobTypeFilter}
            data={getJobTypes()}
            label="Type of job"
            placeholder="Pick type"
            radius="md"
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
}
