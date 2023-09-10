import { useForm } from "@mantine/form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateJobDetailsForm } from "../components/create-petsitter-job/CreateJobDetailsForm";
import { CreateJobModel, JobValidation } from "../models/Job";
import { usePostJobs } from "./JobHooks";
import { useNotification } from "./useNotification";

export const useCreateJobDetailsForm = (selectedPetIds: number[]) => {
  const navigate = useNavigate();
  const notification = useNotification();

  const [stepDisabled, setStepDisabled] = useState(true);
  const [job, error, postJob] = usePostJobs();

  const form = useForm({
    initialValues: {
      hours: 0,
      location: "",
      description: "",
      minRequiredExperience: 1,
      payment: 0,
    } as CreateJobModel,
    validate: {
      description: (val) => JobValidation.validateDescription(val),
      location: (val) => JobValidation.validateLocation(val),
    },
    validateInputOnChange: true,
  });

  const handleCreateJob = (job: CreateJobModel) => {
    postJob(
      { ...job, petIDs: selectedPetIds },
      {
        onSuccess() {
          navigate("/postedjobs");
        },
        onError(error) {
          notification.error("Sorry could not make job.");
        },
      }
    );
  };

  const onFinish = () => {
    handleCreateJob(form.values);
  };
  return {
    stepDisabled: !form.isValid(),
    onFinish: onFinish,
    title: "More information",
    content: <CreateJobDetailsForm form={form}></CreateJobDetailsForm>,
  };
};
