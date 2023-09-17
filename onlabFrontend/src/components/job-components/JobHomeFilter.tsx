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
import { DatePickerInput, DateValue, DatesRangeValue } from "@mantine/dates";
import {
  IconBed,
  IconCalendarEvent,
  IconCalendarRepeat,
  IconDogBowl,
  IconHome,
  IconPaw,
  IconX,
} from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Days, JobType } from "../../models/Job";
import { PetSpecies } from "../../models/Pet";

export default function JobHomeFilter() {
  const navigate = useNavigate();

  const [dateRangeValue, setDateRangeValue] = useState<
    [Date | null, Date | null]
  >([null, null]);

  const [speciesService, setSpeciesService] = useState<PetSpecies[]>([
    PetSpecies.Dog,
  ]);

  const [selectedJobType, setSelectedJobType] = useState<JobType>(
    JobType.Sitting
  );
  const [repeatable, setRepeatable] = useState<boolean>(false);

  const [days, setDays] = useState<Days[]>([]);

  const handleSelectDays = (values: string[]) => setDays(values as Days[]);

  const handleSelectJobType = (value: string) => {
    const jobType = value as JobType;
    setSelectedJobType(jobType);

    if (
      (jobType === JobType.Boarding || jobType === JobType.Sitting) &&
      repeatable
    )
      setRepeatable((t) => !t);
  };

  const handleSelectPetSpecies = (value: string[]) =>
    setSpeciesService(value as PetSpecies[]);

  const handleSelectRepeatable = (value: string) => {
    const realValue = value as Frequency;
    if (realValue === Frequency.Once) setRepeatable(false);
    else if (realValue === Frequency.Repeat) {
      setRepeatable(true);
    }
  };
  const handleSelectDate = (value: DatesRangeValue | DateValue) => {
    if (Array.isArray(value) && value.length === 2) {
      setDateRangeValue(value);
    } else if (!Array.isArray(value)) {
      setDateRangeValue([value, dateRangeValue[1]]);
    }
  };
  const handleOnSearch = () => {
    navigate("/jobs");
  };
  return (
    <Paper shadow="sm" p="xl" radius="md">
      <Stack w="100%">
        <Group w="100%">
          <Title order={4}>I want to have service for: </Title>
          <Checkbox.Group
            defaultValue={speciesService}
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

          <Chip.Group
            defaultValue={selectedJobType}
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

        <Group position="center" align="flex-end" grow>
          <ChipFrequency
            handleSetRepeatable={handleSelectRepeatable}
            jobType={selectedJobType}
          />
          {repeatable ? (
            <DatePickerInput
              type="default"
              label="Start date"
              placeholder="Start date"
              value={dateRangeValue[0]}
              onChange={handleSelectDate}
              mx="auto"
              maw={300}
            />
          ) : (
            <DatePickerInput
              type="range"
              label="For these days"
              placeholder="Start date - End date"
              value={dateRangeValue}
              onChange={handleSelectDate}
              mx="auto"
              maw={300}
            />
          )}
        </Group>
        {repeatable && <ChipDays handleSetDays={handleSelectDays} />}
        <Button onClick={handleOnSearch}>Search</Button>
      </Stack>
    </Paper>
  );
}

interface IChipFrequencyProps {
  jobType: JobType;
  handleSetRepeatable(value: string): void;
}

export function ChipFrequency({
  jobType,
  handleSetRepeatable,
}: IChipFrequencyProps) {
  if (jobType === JobType.Boarding || jobType === JobType.Sitting) return;
  return (
    <Chip.Group defaultValue={Frequency.Once} onChange={handleSetRepeatable}>
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
          {Object.values(Days).map((s) => (
            <Chip value={s} key={s} size="md" radius="sm">
              {s}
            </Chip>
          ))}
        </Group>
      </Stack>
    </Chip.Group>
  );
}

enum Frequency {
  Once = "Once",
  Repeat = "Repeat",
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
