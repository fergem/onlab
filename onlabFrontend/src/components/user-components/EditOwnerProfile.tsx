import { Button, NumberInput, Stack, Textarea } from "@mantine/core";
import { useState } from "react";
import { UpdateOwnerProfileModel } from "../../models/OwnerProfile";

export interface IEditOwnerProfile {
  currentOwnerProfile: UpdateOwnerProfileModel;
  updateOwnerProfile(ownerProfile: UpdateOwnerProfileModel): void;
}

export default function EditOwnerProfile({
  currentOwnerProfile,
  updateOwnerProfile,
}: IEditOwnerProfile) {
  const [ownerProfile, setOwnerProfile] =
    useState<UpdateOwnerProfileModel>(currentOwnerProfile);

  const updateDisabled =
    ownerProfile.minWage === currentOwnerProfile?.minWage &&
    ownerProfile.minRequiredExperience ===
      currentOwnerProfile?.minRequiredExperience &&
    ownerProfile.description === currentOwnerProfile?.description;

  const handleUpdate = () => {
    updateOwnerProfile(ownerProfile);
  };

  const handleSetDescription = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newDescription = event.target.value;
    setOwnerProfile((prev) => ({ ...prev, description: newDescription }));
  };

  const handleSetExperience = (value: number) => {
    setOwnerProfile((prev) => ({
      ...prev,
      minRequiredExperience: value,
    }));
  };

  const handleSetMinWage = (value: number) => {
    setOwnerProfile((prev) => ({
      ...prev,
      minWage: value,
    }));
  };

  return (
    <Stack justify="center" align="center">
      <Textarea
        label="Description"
        placeholder="This the petsitter will see when applying to your job"
        miw="250px"
        onChange={handleSetDescription}
        value={ownerProfile.description}
      />
      <NumberInput
        label="Your default minimum wage"
        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
        step={5}
        formatter={(value) =>
          !Number.isNaN(parseFloat(value))
            ? `$ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
            : "$ "
        }
        miw="250px"
        min={0}
        onChange={handleSetMinWage}
        value={ownerProfile.minWage}
      />
      <NumberInput
        label="Min. required years of exp. for petsitter"
        miw="250px"
        min={0}
        onChange={handleSetExperience}
        value={ownerProfile.minRequiredExperience}
      />
      <Button type="submit" disabled={updateDisabled} onClick={handleUpdate}>
        Update owner profile
      </Button>
    </Stack>
  );
}
