import { useState } from "react";
import PetSelector from "../components/create-petsitter-job/PetSelector";
import { CreateJobModel } from "../models/Job";

export interface IPropsPetSelectorHook {
  newJob: CreateJobModel;
  handleSetNewJob: (jobModel: CreateJobModel) => void;
}

export const usePetSelector = ({
  newJob,
  handleSetNewJob,
}: IPropsPetSelectorHook) => {
  const [selectedPets, setSelectedPets] = useState<number[]>(newJob.petIDs);

  const handleSelectPets = (id: number) => {
    if (selectedPets.includes(id)) {
      setSelectedPets((t) => t.filter((s) => s !== id));
    } else {
      setSelectedPets((t) => [...t, id]);
    }
  };

  const onNext = () => handleSetNewJob({ ...newJob, petIDs: selectedPets });

  const stepDisabled = selectedPets?.length === 0;
  return {
    onNext,
    stepDisabled,
    title: "Please select pets",
    content: <PetSelector selectPets={handleSelectPets} />,
  };
};
