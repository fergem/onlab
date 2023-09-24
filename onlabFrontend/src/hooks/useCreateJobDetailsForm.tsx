import { useForm } from "@mantine/form";
import CreateJobDetailsForm from "../components/create-petsitter-job/CreateJobDetailsForm";
import {
  CreateJobDetailsModel,
  CreateJobModel,
  JobValidation,
} from "../models/Job";

export interface IPropsJobDetailsForm {
  newJob: CreateJobModel;
  handleSetNewJob: (jobModel: CreateJobModel) => void;
}

export default function useCreateJobDetailsForm({
  newJob,
  handleSetNewJob,
}: IPropsJobDetailsForm) {
  const form = useForm({
    initialValues: {
      location: newJob.location,
      description: newJob.description,
      minRequiredExperience: newJob.minRequiredExperience,
      payment: newJob.payment,
      title: newJob.title,
    } as CreateJobDetailsModel,
    validate: {
      description: (val) => JobValidation.validateDescription(val),
      location: (val) => JobValidation.validateLocation(val),
    },
    validateInputOnChange: true,
  });

  const onNext = () => {
    handleSetNewJob({ ...newJob, ...form.values });
  };

  return {
    stepDisabled: !form.isValid(),
    onNext,
    title: "Title and details",
    content: <CreateJobDetailsForm form={form} />,
  };
}
