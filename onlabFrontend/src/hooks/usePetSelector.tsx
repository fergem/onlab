import { Dispatch, SetStateAction } from "react";
import { PetSelector } from "../components/create-petsitter-job/PetSelector";
import Pet from "../models/Pet";

export const usePetSelector = (
  selectedPets: number[],
  setSelectedPets: (id: number) => void
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
