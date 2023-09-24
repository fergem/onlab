import { Center, Paper } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomStepper from "../components/CustomStepper";

import { usePostJobs } from "../hooks/JobHooks";
import useCreateJobDetailsForm from "../hooks/useCreateJobDetailsForm";
import useCreateJobServiceForm from "../hooks/useCreateJobServiceForm";
import { usePetSelector } from "../hooks/usePetSelector";
import { CreateJobModel, Defaultjob as DefaultJob } from "../models/Job";

export default function CreatePetSitterJob() {
  const { postJob } = usePostJobs();

  const navigate = useNavigate();

  const [newJob, setNewJob] = useState<CreateJobModel>(DefaultJob);
  const handleSetNewJob = (jobModel: CreateJobModel) => {
    setNewJob(jobModel);
  };

  const petSelectorStep = usePetSelector({
    newJob,
    handleSetNewJob,
  });
  const createJobDetailsFormStep = useCreateJobDetailsForm({
    newJob,
    handleSetNewJob,
  });
  const createJobServiceFormStep = useCreateJobServiceForm({
    newJob,
    handleSetNewJob,
  });
  const handlePostJob = () => {
    postJob(newJob);
    navigate("/postedjobs");
  };
  console.log(newJob);
  return (
    <Center mih="80vh">
      <Paper shadow="sm" p="xl" w="50%">
        <CustomStepper
          steps={[
            petSelectorStep,
            createJobDetailsFormStep,
            createJobServiceFormStep,
          ]}
          onFinal={handlePostJob}
        />
      </Paper>
    </Center>
  );
}
