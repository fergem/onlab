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
import { useForm } from "@mantine/form";
interface IProps {
  selectedPetIds: number[];
}

export const CreateJobDetailsForm: React.FC<IProps> = ({ selectedPetIds }) => {
  const navigate = useNavigate();
  const notification = useNotification();

  const form = useForm({
    initialValues: {
      hours: 0,
      location: "",
      description: "",
      minRequiredExperience: 1,
      payment: 0,
    },
    validate: {
      description: (val) => JobValidation.validateDescription(val),
      location: (val) => JobValidation.validateLocation(val),
    },
    validateInputOnChange: true,
  });

  const { user } = useAuth();

  const handleCreateJob = (job: CreateJobModel) => {
    postJob(
      { ...job, petIDs: selectedPetIds },
      {
        onSuccess() {
          navigate("/postedjobs");
        },
        onError(error) {},
      }
    );
  };

  const [job, error, postJob] = usePostJobs();
  return (
    <form onSubmit={form.onSubmit(handleCreateJob)}>
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
