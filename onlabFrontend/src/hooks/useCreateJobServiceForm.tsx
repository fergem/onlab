import { useState } from "react";
import CreateJobServiceForm from "../components/create-petsitter-job/CreateJobServiceForm";
import { CreateJobModel, CreateJobServiceModel } from "../models/Job";

export interface IPropsCreateJobServiceForm {
  newJob: CreateJobModel;
  handleSetNewJob: (jobModel: CreateJobModel) => void;
}

export default function useCreateJobServiceForm({
  newJob,
  handleSetNewJob,
}: IPropsCreateJobServiceForm) {
  const [serviceModel, setServiceModel] = useState({
    repeated: newJob.repeated,
    days: newJob.days,
    type: newJob.type,
    startDate: newJob.startDate,
    endDate: newJob.endDate,
  } as CreateJobServiceModel);

  const handleUpdateServiceModel = (model: CreateJobServiceModel) => {
    setServiceModel(model);
    handleSetNewJob({ ...newJob, ...model });
  };

  const onFinish = () => {
    console.log({ ...newJob, ...serviceModel });
  };

  return {
    onFinish,
    title: "Type of service and date",
    content: (
      <CreateJobServiceForm
        serviceModel={serviceModel}
        handleUpdateServiceModel={handleUpdateServiceModel}
      />
    ),
  };
}
