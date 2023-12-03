import {
  Checkbox,
  Divider,
  Group,
  MultiSelect,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useMediaQuery } from "@mantine/hooks";
import dayjs from "dayjs";
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
    <Stack w={isDesktop ? "500px" : "100%"} h={isDesktop ? "300px" : "100%"}>
      <Paper shadow="sm" p="xs" withBorder>
        <Stack justify="center" spacing="xl">
          <Group w="100%">
            <Title order={5}>I am looking to care for: </Title>
            <Checkbox.Group
              value={jobFilter.species}
              onChange={handleSelectPetSpecies}
            >
              <Group>
                {Object.values(PetSpecies).map((s) => (
                  <Checkbox value={s} label={`${s}s`} key={s} />
                ))}
              </Group>
            </Checkbox.Group>
          </Group>

          <Divider />
          <Stack spacing={3} align="center">
            <Text fz="sm" fw={500}>
              I want to do
            </Text>
            <MultiSelect
              value={jobFilter.types}
              onChange={handleSelectJobType}
              data={JobFunctions.getJobTypes()}
              placeholder="Pick job types"
              radius="md"
              transitionProps={{
                transition: "pop-top-left",
                duration: 80,
                timingFunction: "ease",
              }}
              w="100%"
            />
          </Stack>
          <ChipFrequency
            handleSetRepeatable={handleSelectRepeatable}
            repeated={jobFilter.repeated}
            jobType={jobFilter.types}
          />
          {jobFilter.repeated && (
            <Stack spacing={3} align="center">
              <Text fz="sm" fw={500}>
                I can work on
              </Text>
              <MultiSelect
                data={Object.entries(Day).map((s) => ({
                  value: s[0],
                  label: s[1],
                }))}
                value={jobFilter.days}
                onChange={handleSelectDays}
                placeholder="Pick type"
                radius="md"
                transitionProps={{
                  transition: "pop-top-left",
                  duration: 80,
                  timingFunction: "ease",
                }}
                w="100%"
              />
            </Stack>
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
              minDate={dayjs().toDate()}
              valueFormat="MMM DD YYYY"
            />
            {!jobFilter.repeated && (
              <>
                <Text mt="lg">-</Text>
                <DatePickerInput
                  type="default"
                  label="End date"
                  placeholder="End date"
                  value={jobFilter.endDate}
                  onChange={handleSelectEndDate}
                  mx="auto"
                  maw={300}
                  minDate={dayjs(jobFilter.startDate).add(1, "day").toDate()}
                  valueFormat="MMM DD YYYY"
                />
              </>
            )}
          </Group>
        </Stack>
      </Paper>
    </Stack>
  );
}
