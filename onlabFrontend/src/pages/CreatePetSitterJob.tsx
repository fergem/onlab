import {
  Button,
  Center,
  Code,
  Group,
  Paper,
  Stack,
  Stepper,
} from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "@mantine/form";
import CreateJobDetailsForm from "../components/create-petsitter-job/CreateJobDetailsForm";
import CreateJobServiceForm from "../components/create-petsitter-job/CreateJobServiceForm";
import { usePostJob } from "../hooks/react-query/JobHooks";
import { CreateJobModel, JobType, JobValidation } from "../models/Job";

export default function CreatePetSitterJob() {
  const [active, setActive] = useState(0);
  const { postJob } = usePostJob();
  const navigate = useNavigate();

  const handlePostJob = () => {
    navigate("/postedjobs");
  };

  const form = useForm({
    initialValues: {
      location: "",
      description: "",
      minRequiredExperience: 0,
      payment: 0,
      title: "",
      jobType: JobType.Boarding,
      repeated: false,
      startDate: new Date(),
      endDate: undefined,
      days: [],
      petIDs: [],
    } as CreateJobModel,

    validate: {
      description: (val) => JobValidation.validateDescription(val),
      location: (val) => JobValidation.validateLocation(val),
    },
    validateInputOnChange: true,
  });

  const nextStep = () =>
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      }
      return current < 3 ? current + 1 : current;
    });

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  return (
    <Center mih="80vh">
      <Paper shadow="sm" p="xl" w="50%">
        <Stack spacing="xs">
          <Stepper
            active={active}
            onStepClick={setActive}
            breakpoint="sm"
            allowNextStepsSelect={false}
            color="indigo"
            iconSize={32}
          >
            <Stepper.Step label="First step" description="Title and Details">
              <CreateJobDetailsForm form={form} />
            </Stepper.Step>

            <Stepper.Step
              label="Second step"
              description="Personal information"
            >
              <CreateJobServiceForm form={form} />
            </Stepper.Step>
            <Stepper.Step label="Final step" description="Social media" />

            <Stepper.Completed>
              Completed! Form values:
              <Code block mt="xl">
                {JSON.stringify(form.values, null, 2)}
              </Code>
            </Stepper.Completed>
          </Stepper>

          <Group align="flex-end" mt="xl">
            {active !== 0 && (
              <Button variant="default" onClick={prevStep}>
                Back
              </Button>
            )}
            {active !== 3 && <Button onClick={nextStep}>Next step</Button>}
          </Group>
        </Stack>
      </Paper>
    </Center>
  );
}
