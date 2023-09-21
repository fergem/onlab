import { useForm } from "@mantine/form";
import { useLocalStorage } from "@mantine/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreateJobDetailsForm from "../components/create-petsitter-job/CreateJobDetailsForm";
import { CreateJobModel, JobType, JobValidation } from "../models/Job";
import { usePostJobs } from "./JobHooks";
import useNotification from "./useNotification";

export default function useCreateJobDetailsForm(selectedPetIds: number[]) {
  const navigate = useNavigate();
  const notification = useNotification();

  const { isPostinJob, error, postJob } = usePostJobs();

  const form = useForm({
    initialValues: {
      hours: 0,
      location: "",
      description: "",
      minRequiredExperience: 1,
      payment: 0,
      title: "",
      repeated: false,
      days: undefined,
      type: JobType.Sitting,
      startDate: new Date(),
      endDate: undefined,
    } as CreateJobModel,
    validate: {
      description: (val) => JobValidation.validateDescription(val),
      location: (val) => JobValidation.validateLocation(val),
    },
    validateInputOnChange: true,
  });

  const [formState, setFormState] = useLocalStorage<CreateJobModel>({
    key: "job-details-form",
    defaultValue: form.values,
  });

  useEffect(() => {
    setFormState(form.values);
  }, []);

  const handleCreateJob = (jobToPost: CreateJobModel) => {
    postJob(
      { ...jobToPost, petIDs: selectedPetIds },
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
    onFinish,
    title: "More information",
    content: <CreateJobDetailsForm form={form} />,
  };
}
