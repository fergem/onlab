import { CreateJobDetailsForm } from "../components/create-petsitter-job/CreateJobDetailsForm";

export const useCreateJobDetailsForm = (selectedPetIds: number[]) => {
  return {
    title: "More information",
    content: (
      <CreateJobDetailsForm
        selectedPetIds={selectedPetIds}></CreateJobDetailsForm>
    ),
  };
};
