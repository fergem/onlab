import { Chip, Group, Stack, Text } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import useJobFilter from "../../hooks/useJobFilter";
import { CreateJobServiceModel, JobType } from "../../models/Job";

import {
  ChipDays,
  ChipFrequency,
  JobChipIcon,
} from "../job-components/JobHomeFilter";

interface IProps {
  serviceModel: CreateJobServiceModel;
  handleUpdateServiceModel(model: CreateJobServiceModel): void;
}

export default function CreateJobServiceForm({
  serviceModel,
  handleUpdateServiceModel,
}: IProps) {
  const {
    handleSelectDays,
    handleSelectJobType,
    handleSelectRepeatable,
    handleSelectStartDate,
    handleSelectEndDate,
  } = useJobFilter({
    jobFilter: serviceModel,
    setJobFilter: handleUpdateServiceModel,
  });
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

        <Chip.Group value={serviceModel.type} onChange={handleSelectJobType}>
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
        <ChipFrequency
          handleSetRepeatable={handleSelectRepeatable}
          jobType={serviceModel.type}
          repeated={serviceModel.repeated}
        />
        <Group position="center" align="center" noWrap>
          <DatePickerInput
            type="default"
            label="Start date"
            placeholder="Start date"
            value={serviceModel.startDate}
            onChange={handleSelectStartDate}
            mx="auto"
            maw={300}
          />
          {!serviceModel.repeated && (
            <>
              <Text>-</Text>
              <DatePickerInput
                type="default"
                label="End date"
                placeholder="End date"
                value={serviceModel.endDate}
                onChange={handleSelectEndDate}
                mx="auto"
                maw={300}
              />
            </>
          )}
        </Group>
      </Group>
      {serviceModel.repeated && <ChipDays handleSetDays={handleSelectDays} />}
    </Stack>
  );
}
