import {
  Button,
  Checkbox,
  Chip,
  Divider,
  Group,
  Paper,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useLocalStorage } from "@mantine/hooks";
import {
  IconBed,
  IconCalendarEvent,
  IconCalendarRepeat,
  IconDogBowl,
  IconHome,
  IconPaw,
  IconX,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

import useJobFilter, {
  JobFilterLocalStorageKey,
} from "../../hooks/useJobFilter";

import {
  Day,
  DefaultJobFilter,
  Frequency,
  JobFilter,
  JobFunctions,
  JobType,
} from "../../models/Job";
import { PetSpecies } from "../../models/Pet";

export default function JobHomeFilter() {
  const navigate = useNavigate();
  const [jobFilter, setJobFilter] = useLocalStorage<JobFilter>({
    key: JobFilterLocalStorageKey,
    defaultValue: DefaultJobFilter,
    deserialize: JobFunctions.deserializeJobFromStorage,
  });

  const {
    handleSelectDays,
    handleSelectJobType,
    handleSelectRepeatable,
    handleSelectPetSpecies,
    handleSelectStartDate,
    handleSelectEndDate,
  } = useJobFilter({ jobFilter, setJobFilter });

  const handleOnSearch = () => {
    navigate("/jobs");
  };

  return (
    <Paper shadow="sm" p="xl" radius="md">
      <Stack w="100%">
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
          <Chip.Group
            multiple
            value={jobFilter.types}
            onChange={handleSelectJobType}
          >
            <Group position="center">
              {Object.values(JobType).map((s) => (
                <Chip value={s} size="md" radius="sm" key={s}>
                  <JobChipIcon jobType={s} />
                  <Text ml="sm">{s}</Text>
                </Chip>
              ))}
            </Group>
          </Chip.Group>
        </Stack>

        <Group position="center" align="flex-end" grow={jobFilter.repeated}>
          <ChipFrequency
            handleSetRepeatable={handleSelectRepeatable}
            jobType={jobFilter.types}
            repeated={jobFilter.repeated}
          />
          <Group position="center" align="center" noWrap spacing={5}>
            <DatePickerInput
              type="default"
              label="Start date"
              placeholder="Start date"
              value={jobFilter.startDate}
              onChange={handleSelectStartDate}
              mx="auto"
              maw={300}
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
                  valueFormat="MMM DD YYYY"
                />
              </>
            )}
          </Group>
        </Group>
        {jobFilter.repeated && <ChipDays handleSetDays={handleSelectDays} />}
        <Button onClick={handleOnSearch}>Search</Button>
      </Stack>
    </Paper>
  );
}

interface IChipFrequencyProps {
  repeated: boolean;
  jobType: JobType[];
  handleSetRepeatable(value: string): void;
}

export function ChipFrequency({
  repeated,
  jobType,
  handleSetRepeatable,
}: IChipFrequencyProps) {
  const repeatedDisabled =
    jobType.includes(JobType.Boarding) || jobType.includes(JobType.Sitting);

  return (
    <Chip.Group
      value={repeated === false ? Frequency.Once : Frequency.Repeat}
      onChange={handleSetRepeatable}
    >
      <Stack spacing={3}>
        <Text fz="sm" fw={500} align="center">
          I want to work
        </Text>
        <Group position="center" align="center">
          <Chip value={Frequency.Once} size="md" radius="sm">
            <IconCalendarEvent />
            <Text ml="sm">Once</Text>
          </Chip>
          <Chip
            value={Frequency.Repeat}
            size="md"
            radius="sm"
            disabled={repeatedDisabled}
          >
            <IconCalendarRepeat />
            <Text ml="sm">Frequently</Text>
          </Chip>
        </Group>
      </Stack>
    </Chip.Group>
  );
}

interface IChipDaysProps {
  handleSetDays(values: string[]): void;
}

export function ChipDays({ handleSetDays }: IChipDaysProps) {
  return (
    <Chip.Group onChange={handleSetDays} multiple>
      <Stack spacing={3} align="center">
        <Text fz="sm" fw={500}>
          I can work on
        </Text>
        <Group position="center" align="center">
          {Object.values(Day).map((s) => (
            <Chip value={s} key={s} size="md" radius="sm">
              {s}
            </Chip>
          ))}
        </Group>
      </Stack>
    </Chip.Group>
  );
}

interface IChipWithIconProps {
  jobType: JobType;
  withTooltip?: boolean;
}

export function JobChipIcon({
  jobType,
  withTooltip = false,
}: IChipWithIconProps) {
  switch (jobType) {
    case JobType.Boarding:
      return (
        <Tooltip label={JobType.Boarding} disabled={!withTooltip}>
          <IconBed />
        </Tooltip>
      );
    case JobType.Sitting:
      return (
        <Tooltip label={JobType.Sitting} disabled={!withTooltip}>
          <IconHome />
        </Tooltip>
      );
    case JobType.Visit:
      return (
        <Tooltip label={JobType.Visit} disabled={!withTooltip}>
          <IconDogBowl />
        </Tooltip>
      );
    case JobType.Walking:
      return (
        <Tooltip label={JobType.Walking} disabled={!withTooltip}>
          <IconPaw />
        </Tooltip>
      );
    default:
      return <IconX />;
  }
}
