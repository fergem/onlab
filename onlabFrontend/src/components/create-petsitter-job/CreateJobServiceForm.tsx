import {
  Button,
  Checkbox,
  Chip,
  Divider,
  Group,
  Stack,
  Title,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { UseFormReturnType } from "@mantine/form";
import { CreateJobModel, JobType } from "../../models/Job";
import { PetSpecies } from "../../models/Pet";
import { ChipDays } from "../job-components/JobDetail";
import { ChipFrequency, JobChipIcon } from "../job-components/JobHomeFilter";

export type CreateJobForm = UseFormReturnType<
  CreateJobModel,
  (values: CreateJobModel) => CreateJobModel
>;

interface IProps {
  form: CreateJobForm;
}

export default function CreateJobServiceForm({ form }: IProps) {
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
  </Stack>;
}
