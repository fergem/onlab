import {
  Checkbox,
  Divider,
  Group,
  MultiSelect,
  Paper,
  Stack,
  Text,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useMediaQuery } from "@mantine/hooks";
import useJobFilter from "../../hooks/useJobFilter";
import { Day, JobFilter, JobFunctions } from "../../models/Job";
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
  } = useJobFilter({ jobFilter, setJobFilter });
  const isDesktop = useMediaQuery("(min-width: 56.25em)");

  return (
    <Stack w={isDesktop ? "20vw" : "100%"} h={isDesktop ? "40vw" : "100%"}>
      <Paper shadow="sm" p="xs" withBorder>
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
          <MultiSelect
            value={jobFilter.types}
            onChange={handleSelectJobType}
            data={JobFunctions.getJobTypes()}
            label="Types of job"
            placeholder="Pick job types"
            radius="md"
            transitionProps={{
              transition: "pop-top-left",
              duration: 80,
              timingFunction: "ease",
            }}
          />
          <ChipFrequency
            handleSetRepeatable={handleSelectRepeatable}
            jobType={jobFilter.types}
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
    </Stack>
  );
}
