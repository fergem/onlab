import { Dispatch, SetStateAction, useState } from "react";
import { PetSelector } from "../components/create-petsitter-job/PetSelector";
import Pet from "../models/Pet";
import { useGetUserPets } from "./UserHooks";

export interface IPropsPetSelectorHook {
  selectedPets: number[];
  handleSelectPets: (id: number) => void;
}

export const usePetSelector = ({
  selectedPets,
  handleSelectPets,
}: IPropsPetSelectorHook) => {
  const stepDisabled = selectedPets?.length === 0;
  return {
    stepDisabled: stepDisabled,
    title: "Please select pets",
    content: <PetSelector selectPets={handleSelectPets} />,
  };
};
