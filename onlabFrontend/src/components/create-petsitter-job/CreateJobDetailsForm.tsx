import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthHooks";
import { usePostJobs } from "../../hooks/JobHooks";
import Job, { CreateJobModel, JobValidation } from "../../models/Job";

import {
  Button,
  Grid,
  NumberInput,
  Paper,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useNotification } from "../../hooks/useNotification";
import { useForm, UseFormReturnType } from "@mantine/form";

export type CreateJobForm = UseFormReturnType<
  CreateJobModel,
  (values: CreateJobModel) => CreateJobModel
>;

interface IProps {
  form: CreateJobForm;
}

export const CreateJobDetailsForm: React.FC<IProps> = ({ form }) => {
  return (
    <form>
      <Stack justify="space-evenly">
        <Grid>
          <Grid.Col span={4}>
            <NumberInput
              label="Hours"
              withAsterisk
              {...form.getInputProps("hours")}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <NumberInput
              label="Min experience"
              withAsterisk
              {...form.getInputProps("minRequiredExperience")}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <NumberInput
              label="Payment by hours"
              withAsterisk
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              step={5}
              formatter={(value) =>
                !Number.isNaN(parseFloat(value))
                  ? `$ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                  : "$ "
              }
              {...form.getInputProps("payment")}
            />
          </Grid.Col>
        </Grid>
        <TextInput
          withAsterisk
          label="Location"
          placeholder="Budapest"
          {...form.getInputProps("location")}
        />

        <Textarea
          placeholder="Your text"
          label="Description"
          withAsterisk
          {...form.getInputProps("description")}
        />
      </Stack>
    </form>
  );
};
