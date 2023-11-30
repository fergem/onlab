import { Button, Center, Group, Paper, Stack, Stepper } from "@mantine/core";
import { useState } from "react";

import { useForm } from "@mantine/form";
import CreateJobDetailsForm from "../components/create-petsitter-job/CreateJobDetailsForm";
import CreateJobServiceForm from "../components/create-petsitter-job/CreateJobServiceForm";
import PetSelector from "../components/create-petsitter-job/PetSelector";
import { usePostJob } from "../hooks/react-query/JobHooks";
import { CreateJobModel, JobType, JobValidation } from "../models/Job";

export default function CreatePetSitterJob() {
  const [activeStep, setActiveStep] = useState(0);
  const { postJob } = usePostJob();

  const handlePostJob = () => {
    postJob(form.values);
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

    validate: (val) => {
      if (activeStep === 0) {
        return {
          petIDs: JobValidation.validatePetSelect(val.petIDs),
        };
      }
      if (activeStep === 1) {
        return {
          type: JobValidation.validateJobType(
            val.jobType,
            val.repeated,
            val.days
          ),
          endDate: JobValidation.validateEndDate(val.repeated, val.endDate),
          startDate: JobValidation.validateStartDate(val.startDate),
          days: JobValidation.validateDays(val.repeated, val.days),
        };
      }
      if (activeStep === 2) {
        return {
          description: JobValidation.validateDescription(val.description),
          location: JobValidation.validateLocation(val.location),
          title: JobValidation.validateTitle(val.title),
        };
      }
      return {};
    },
  });

  const nextStep = () =>
    setActiveStep((current) => {
      if (form.validate().hasErrors) {
        return current;
      }
      return current < 3 ? current + 1 : current;
    });

  const prevStep = () =>
    setActiveStep((current) => (current > 0 ? current - 1 : current));

  const lastStep = () => handlePostJob();

  return (
    <Center mih="80vh">
      <Paper shadow="sm" p="xl" w="50%" withBorder>
        <Stack spacing="xs">
          <Stepper
            active={activeStep}
            onStepClick={setActiveStep}
            breakpoint="sm"
            allowNextStepsSelect={false}
            color="indigo"
            iconSize={32}
          >
            <Stepper.Step label="Select pets">
              <PetSelector form={form} />
            </Stepper.Step>

            <Stepper.Step label="Type of Service">
              <CreateJobServiceForm form={form} />
            </Stepper.Step>

            <Stepper.Step label="Title and Details">
              <CreateJobDetailsForm form={form} />
            </Stepper.Step>
          </Stepper>

          <Group align="flex-end" mt="xl">
            {activeStep !== 0 && (
              <Button variant="default" onClick={prevStep}>
                Back
              </Button>
            )}
            {activeStep !== 2 && (
              <Button onClick={nextStep} disabled={!form.isValid()}>
                Next step
              </Button>
            )}
            {activeStep === 2 && (
              <Button onClick={lastStep} disabled={!form.isValid()}>
                Post job
              </Button>
            )}
          </Group>
        </Stack>
      </Paper>
    </Center>
  );
}
