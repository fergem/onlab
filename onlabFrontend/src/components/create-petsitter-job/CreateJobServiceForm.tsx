import { Chip, Group, Stack, Text } from "@mantine/core";
import { DatePickerInput, DateValue } from "@mantine/dates";
import { IconCalendarEvent, IconCalendarRepeat } from "@tabler/icons-react";
import dayjs from "dayjs";
import { Day, Frequency, JobType } from "../../models/Job";
import { JobChipIcon } from "../job-components/JobHomeFilter";
import { CreateJobDetailsFormType } from "./CreateJobDetailsForm";

interface IProps {
  form: CreateJobDetailsFormType;
}

export default function CreateJobServiceForm({ form }: IProps) {
  const handleSelectJobType = (value: string) => {
    const realValue = value as JobType;

    if (realValue === JobType.Boarding || realValue === JobType.Sitting) {
      form.setFieldValue("jobType", realValue);
      form.setFieldValue("repeated", false);
      form.setFieldValue("days", []);
    } else {
      form.setFieldValue("jobType", realValue);
    }
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
        form.setFieldValue("endDate", undefined);
        break;
      default: // should not happen
        break;
    }
  };

  const handleSelectStartDate = (value: DateValue) => {
    const newDate = dayjs(value).utc(true).toDate();
    if (value) form.setFieldValue("startDate", newDate);
  };

  const handleSelectEndDate = (value: DateValue) => {
    const newDate = dayjs(value).utc(true).toDate();
    form.setFieldValue("endDate", newDate ?? undefined);
  };

  const handleSelectDays = (values: string[]) => {
    const realValues = values as Day[];
    if (form.values.days) {
      form.setFieldValue("days", realValues);
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

        <Chip.Group onChange={handleSelectJobType} value={form.values.jobType}>
          <Group position="center" spacing={30}>
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
        {!(
          form.values.jobType === JobType.Boarding ||
          form.values.jobType === JobType.Sitting
        ) && (
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
        )}
        <Group position="center" align="center" noWrap maw="350px">
          <DatePickerInput
            type="default"
            label="Start date"
            placeholder="Start date"
            value={form.values.startDate}
            onChange={handleSelectStartDate}
            mx="auto"
            miw="150px"
            maw="300px"
            minDate={dayjs().toDate()}
          />
          {!form.values.repeated && (
            <>
              <Text mt="md">-</Text>
              <DatePickerInput
                type="default"
                label="End date"
                placeholder="End date"
                value={form.values.endDate}
                onChange={handleSelectEndDate}
                mx="auto"
                miw="150px"
                maw="300px"
                minDate={dayjs(form.values.startDate).add(1, "day").toDate()}
              />
            </>
          )}
        </Group>
      </Group>
      {form.values.repeated && (
        <Chip.Group
          onChange={handleSelectDays}
          multiple
          value={form.values.days}
        >
          <Stack spacing={3}>
            <Text fz="sm" fw={500} align="center">
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
