import { useState } from "react";
import { CustomStepper } from "../components/CustomStepper";

import { useCreateJobDetailsForm } from "../hooks/useCreateJobDetailsForm";
import { usePetSelector } from "../hooks/usePetSelector";

export default function CreatePetSitterJob() {
  const [selectedPets, setSelectedPets] = useState<number[]>([]);
  const handleSelectPets = (id: number) => {
    if (selectedPets.includes(id)) {
      setSelectedPets((t) => t.filter((s) => s != id));
    } else {
      setSelectedPets((t) => [...t, id]);
    }
  };
  const petSelectorStep = usePetSelector(selectedPets, handleSelectPets);
  const createJobDetailsFormStep = useCreateJobDetailsForm(selectedPets);

  return (
    <Stack minHeight="100%" alignItems="center" justifyContent="center">
      <Card>
        <CustomStepper
          steps={[petSelectorStep, createJobDetailsFormStep]}></CustomStepper>
      </Card>
    </Stack>
  );
}
