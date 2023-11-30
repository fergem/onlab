import { Button, NumberInput, Stack, Textarea } from "@mantine/core";
import { useState } from "react";
import { UpdatePetSitterProfileModel } from "../../models/PetSitterProfile";

export interface IEditPetSitterProfile {
  currentPetSitterProfile: UpdatePetSitterProfileModel;
  updatePetSitterProfile(PetSitterProfile: UpdatePetSitterProfileModel): void;
}

export default function EditPetSitterProfile({
  currentPetSitterProfile,
  updatePetSitterProfile,
}: IEditPetSitterProfile) {
  const [petSitterProfile, setPetSitterProfile] = useState(
    currentPetSitterProfile
  );

  const updateDisabled =
    petSitterProfile?.acquiredExperience ===
      currentPetSitterProfile?.acquiredExperience &&
    petSitterProfile?.description === currentPetSitterProfile?.description;

  const handleUpdate = () => {
    updatePetSitterProfile(petSitterProfile);
  };

  const handleSetDescription = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newDescription = event.target.value;
    setPetSitterProfile((prev) => ({ ...prev, description: newDescription }));
  };

  const handleSetExperience = (value: number) => {
    setPetSitterProfile((prev) => ({
      ...prev,
      acquiredExperience: value,
    }));
  };
  return (
    <Stack justify="center" align="center">
      <Textarea
        label="Description"
        placeholder="This is what the owner will see when applying for job"
        miw="250px"
        onChange={handleSetDescription}
        value={petSitterProfile.description}
      />
      <NumberInput
        label="Acquired experience as a PetSitter"
        miw="250px"
        min={0}
        onChange={handleSetExperience}
        value={petSitterProfile.acquiredExperience}
      />
      <Button disabled={updateDisabled} onClick={handleUpdate}>
        Update petsitter profile
      </Button>
    </Stack>
  );
}
