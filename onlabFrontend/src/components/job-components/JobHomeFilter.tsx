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
import useJobFilter from "../../hooks/useJobFilter";
import {
  Day,
  DefaultJobFilter,
  Frequency,
  JobFilter,
  JobFunctions,
  JobType,
} from "../../models/Job";
import { PetSpecies } from "../../models/Pet";

export const JobFilterLocalStorageKey = "job_filter_key";

export default function JobHomeFilter() {
  const navigate = useNavigate();
  const [jobFilter, setJobFilter] = useLocalStorage<JobFilter>({
    key: JobFilterLocalStorageKey,
    defaultValue: DefaultJobFilter,
    deserialize: JobFunctions.deserializeJobFromStorage,
  });

  const handleSetJobFilter = (filter: JobFilter) => {
    setJobFilter(filter);
  };

  const {
    handleSelectDays,
    handleSelectJobType,
    handleSelectRepeatable,
    handleSelectPetSpecies,
    handleSelectStartDate,
    handleSelectEndDate,
  } = useJobFilter({ jobFilter, setJobFilter: handleSetJobFilter });

  const handleOnSearch = () => {
    navigate("/jobs");
  };

  return (
    <Paper shadow="sm" p="xl" radius="md">
      <Stack w="100%">
        <Group w="100%">
          <Title order={4}>I want to have service for: </Title>
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
        </Group>

        <Divider />

        <Stack spacing={3}>
          <Group grow>
            <Text fz="sm" fw={500}>
              For when you are away
            </Text>
            <Text fz="sm" fw={500}>
              For when you are at home
            </Text>
          </Group>

          <Chip.Group value={jobFilter.type} onChange={handleSelectJobType}>
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

        <Group position="center" align="flex-end" grow>
          <ChipFrequency
            handleSetRepeatable={handleSelectRepeatable}
            jobType={jobFilter.type}
            repeated={jobFilter.repeated}
          />
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
            <Text>-</Text>
            {!jobFilter.repeated && (
              <DatePickerInput
                type="default"
                label="End date"
                placeholder="End date"
                value={jobFilter.endDate}
                onChange={handleSelectEndDate}
                mx="auto"
                maw={300}
              />
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
  jobType: JobType;
  handleSetRepeatable(value: string): void;
}

export function ChipFrequency({
  repeated,
  jobType,
  handleSetRepeatable,
}: IChipFrequencyProps) {
  if (jobType === JobType.Boarding || jobType === JobType.Sitting) return;
  return (
    <Chip.Group
      value={repeated === false ? Frequency.Once : Frequency.Repeat}
      onChange={handleSetRepeatable}
    >
      <Stack spacing={3}>
        <Text fz="sm" fw={500} align="center">
          How often do you need this service?
        </Text>
        <Group position="center" align="center">
          <Chip value={Frequency.Once} size="md" radius="sm">
            <IconCalendarEvent />
            <Text ml="sm">Once</Text>
          </Chip>
          <Chip value={Frequency.Repeat} size="md" radius="sm">
            <IconCalendarRepeat />
            <Text ml="sm">Repeat</Text>
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
      <Stack spacing={3}>
        <Text fz="sm" fw={500}>
          How often do you need this service?
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
}

export function JobChipIcon({ jobType }: IChipWithIconProps) {
  switch (jobType) {
    case JobType.Boarding:
      return <IconBed />;
    case JobType.Sitting:
      return <IconHome />;
    case JobType.Visit:
      return <IconDogBowl />;
    case JobType.Walking:
      return <IconPaw />;
    default:
      return <IconX />;
  }
}
