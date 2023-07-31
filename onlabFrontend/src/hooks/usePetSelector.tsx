import { Dispatch, SetStateAction } from "react";
import { PetSelector } from "../components/create-petsitter-job/PetSelector";

export const usePetSelector = (
  selectedPets: number[],
  setSelectedPets: Dispatch<SetStateAction<number[]>>
) => {
  return {
    title: "Select pets",
    content: (
      <PetSelector
        selectedPets={selectedPets}
        setSelectedPets={setSelectedPets}></PetSelector>
    ),
  };
};
