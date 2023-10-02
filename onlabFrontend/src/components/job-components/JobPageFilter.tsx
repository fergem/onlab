import {
  Checkbox,
  Container,
  Divider,
  Group,
  MultiSelect,
  Paper,
  Select,
  Stack,
  Text,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import useJobFilter from "../../hooks/useJobFilter";
import { Day, JobFilter, getJobTypes } from "../../models/Job";
import { PetSpecies } from "../../models/Pet";
import { ChipFrequency } from "./JobHomeFilter";

interface IJobFilterProps {
  jobFilter: JobFilter;
  setJobFilter(jobFilter: JobFilter): void;
}

export default function JobPageFilter({
  jobFilter,
  setJobFilter,
}: IJobFilterProps) {
  const {
    handleSelectDays,
    handleSelectJobType,
    handleSelectRepeatable,
    handleSelectPetSpecies,
    handleSelectStartDate,
    handleSelectEndDate,
  } = useJobFilter({
    jobFilter,
    setJobFilter,
  });

  return (
    <Container
      sx={() => ({ position: "fixed", top: "150px", left: "50px" })}
      w="25vw"
      h="40vw"
    >
      <Paper shadow="sm" p="sm" withBorder>
        <Text fz="md" align="left">
          Search for:
        </Text>
        <Divider my="sm" />
        <Stack justify="center" spacing="xl">
          <Checkbox.Group
            value={jobFilter.species}
            onChange={handleSelectPetSpecies}
          >
            <Group>
              {Object.values(PetSpecies).map((s) => (
                <Checkbox value={s} label={s} key={s} />
              ))}
            </Group>
          </Checkbox.Group>
          <Select
            value={jobFilter.type}
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
          <ChipFrequency
            handleSetRepeatable={handleSelectRepeatable}
            jobType={jobFilter.type}
            repeated={jobFilter.repeated}
          />
          {jobFilter.repeated && (
            <MultiSelect
              data={Object.entries(Day).map((s) => ({
                value: s[0],
                label: s[1],
              }))}
              value={jobFilter.days}
              onChange={handleSelectDays}
              label="Days of the week "
              placeholder="Pick type"
              radius="md"
              transitionProps={{
                transition: "pop-top-left",
                duration: 80,
                timingFunction: "ease",
              }}
            />
          )}
          <Group position="center" align="center" noWrap>
            <DatePickerInput
              type="default"
              label="Start date"
              placeholder="Start date"
              value={jobFilter.startDate}
              onChange={handleSelectStartDate}
              mx="auto"
              maw={300}
            />

            {!jobFilter.repeated && (
              <>
                <Text>-</Text>
                <DatePickerInput
                  type="default"
                  label="End date"
                  placeholder="End date"
                  value={jobFilter.endDate}
                  onChange={handleSelectEndDate}
                  mx="auto"
                  maw={300}
                />
              </>
            )}
          </Group>
        </Stack>
      </Paper>
    </Container>
  );
}
