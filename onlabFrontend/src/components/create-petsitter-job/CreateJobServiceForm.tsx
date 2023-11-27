import { Chip, Group, Stack, Text } from "@mantine/core";
import { DatePickerInput, DateValue, Day } from "@mantine/dates";
import { IconCalendarEvent, IconCalendarRepeat } from "@tabler/icons-react";
import { Frequency, JobType } from "../../models/Job";

import { JobChipIcon } from "../job-components/JobHomeFilter";
import { CreateJobDetailsFormType } from "./CreateJobDetailsForm";

interface IProps {
  form: CreateJobDetailsFormType;
}

export default function CreateJobServiceForm({ form }: IProps) {
  const handleSelectJobType = (value: string) => {
    form.setFieldValue("jobType", value);
  };
  const handleSelectRepeatable = (value: string) => {
    const realValue = value as Frequency;
    switch (realValue) {
      case Frequency.Once:
        form.setFieldValue("repeated", false);
        form.setFieldValue("days", []);
        break;
      case Frequency.Repeat:
        form.setFieldValue("repeated", true);
        break;
      default: // should not happen
        break;
    }
  };

  const handleSelectStartDate = (value: DateValue) => {
    if (value) form.setFieldValue("startDate", value);
  };

  const handleSelectEndDate = (value: DateValue) => {
    form.setFieldValue("endDate", value ?? undefined);
  };

  const handleSelectDays = (values: string[]) => {
    if (form.values.days) {
      form.setFieldValue("days", values);
    }
  };

  return (
    <Stack w="100%">
      <Stack spacing={3}>
        <Group grow position="center">
          <Text fz="sm" fw={500} align="center">
            For when you are away
          </Text>
          <Text fz="sm" fw={500} align="center">
            For when you are at home
          </Text>
        </Group>

        <Chip.Group onChange={handleSelectJobType}>
          <Group position="apart">
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
        <Chip.Group
          value={
            form.values.repeated === false ? Frequency.Once : Frequency.Repeat
          }
          onChange={handleSelectRepeatable}
        >
          <Stack spacing={3}>
            <Text fz="sm" fw={500} align="center">
              How often do you need this service?
            </Text>
            <Group position="center" align="center">
              <Chip value={0} size="md" radius="sm">
                <IconCalendarEvent />
                <Text ml="sm">Once</Text>
              </Chip>
              <Chip value={1} size="md" radius="sm">
                <IconCalendarRepeat />
                <Text ml="sm">Repeat</Text>
              </Chip>
            </Group>
          </Stack>
        </Chip.Group>
        <Group position="center" align="center" noWrap>
          <DatePickerInput
            type="default"
            label="Start date"
            placeholder="Start date"
            value={form.values.startDate}
            onChange={handleSelectStartDate}
            mx="auto"
            maw={300}
          />
          {!form.values.repeated && (
            <>
              <Text>-</Text>
              <DatePickerInput
                type="default"
                label="End date"
                placeholder="End date"
                value={form.values.endDate}
                onChange={handleSelectEndDate}
                mx="auto"
                maw={300}
              />
            </>
          )}
        </Group>
      </Group>
      {form.values.repeated && (
        <Chip.Group onChange={handleSelectDays} multiple>
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
      )}
    </Stack>
  );
}
