import {
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  Select,
  Stack,
  Text,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import useJobFilter from "../../hooks/useJobFilter";
import { JobFilter, getJobTypes } from "../../models/Job";
import { PetSpecies } from "../../models/Pet";
import { ChipFrequency } from "./JobHomeFilter";

interface IJobFilterProps {
  jobFilter: JobFilter;
  setJobFilter(jobFilter: JobFilter): void;
  refetch(): void;
}

export default function JobPageFilter({
  jobFilter,
  refetch,
  setJobFilter,
}: IJobFilterProps) {
  const navigate = useNavigate();

  const {
    handleSelectDays,
    handleSelectJobType,
    handleSelectRepeatable,
    handleSelectPetSpecies,
    handleSelectDate,
  } = useJobFilter({ jobFilter, setJobFilter });

  const handleFilter = () => {
    refetch();
  };

  console.log(jobFilter);
  return (
    <Container>
      <Paper shadow="sm" p="sm" withBorder>
        <Text fz="md" align="left">
          Search for:
        </Text>

        <Stack justify="center" spacing="xl">
          <Checkbox.Group
            defaultValue={jobFilter.species}
            onChange={handleSelectPetSpecies}
          >
            <Group>
              {Object.values(PetSpecies).map((s) => (
                <Checkbox value={s} label={s} key={s} />
              ))}
            </Group>
          </Checkbox.Group>
          <Select
            onChange={handleSelectJobType}
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
          <Stack>
            <ChipFrequency
              handleSetRepeatable={handleSelectRepeatable}
              jobType={jobFilter.type}
            />
          </Stack>

          <Button onClick={handleFilter}>Apply filters</Button>
        </Stack>
      </Paper>
    </Container>
  );
}
