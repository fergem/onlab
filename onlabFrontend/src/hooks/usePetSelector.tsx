import { Dispatch, SetStateAction } from "react";
import { PetSelector } from "../components/create-petsitter-job/PetSelector";
import Pet from "../models/Pet";
import { useGetUserPets } from "./UserHooks";

export const usePetSelector = (setSelectedPets: (id: number) => void) => {
  const [pets, error, loading] = useGetUserPets();

  return {
    title: "Please select pets",
    content: (
      <PetSelector
        setSelectedPets={setSelectedPets}
        pets={pets}
        error={error}
        loading={loading}></PetSelector>
    ),
  };
};
