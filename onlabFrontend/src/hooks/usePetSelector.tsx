import PetSelector from "../components/create-petsitter-job/PetSelector";

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
    stepDisabled,
    title: "Please select pets",
    content: <PetSelector selectPets={handleSelectPets} />,
  };
};
