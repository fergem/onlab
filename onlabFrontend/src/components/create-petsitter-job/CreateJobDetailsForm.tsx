import { Grid, NumberInput, Stack, Textarea, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { CreateJobModel } from "../../models/Job";

export type CreateJobForm = UseFormReturnType<
  CreateJobModel,
  (values: CreateJobModel) => CreateJobModel
>;

interface IProps {
  form: CreateJobForm;
}

export default function CreateJobDetailsForm({ form }: IProps) {
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
}
