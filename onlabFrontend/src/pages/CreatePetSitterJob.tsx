import { useState } from "react";
import { CustomStepper } from "../components/CustomStepper";

import { useCreateJobDetailsForm } from "../hooks/useCreateJobDetailsForm";
import { usePetSelector } from "../hooks/usePetSelector";
import { Card, Container, Stack } from "@mui/material";

export default function CreatePetSitterJob() {
  const [selectedPets, setSelectedPets] = useState<number[]>([]);
  const petSelectorStep = usePetSelector(selectedPets, setSelectedPets);
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
