import {
  Button,
  Grid,
  NumberInput,
  Select,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { useNotification } from "../../hooks/useNotification";
import { usePostUserPet } from "../../hooks/UserHooks";
import Pet, {
  getPetSpeciesValueLabel,
  PetSpecies,
  PetValidation,
} from "../../models/Pet";
import PetImageSelect from "./PetImageSelect";

interface IAddPetProps {
  close(): void;
}

export default function AddPetForm({ close }: IAddPetProps) {
  const { error, postPet } = usePostUserPet();
  const [petImage, setPetImage] = useState<File | null>(null);
  const notification = useNotification();

  const handleSetPetimage = (file: File) => {
    setPetImage(file);
  };

  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      species: PetSpecies.Dog,
      age: 1,
    } as Pet,
    validate: {
      name: (val) => PetValidation.validateName(val),
      description: (val) => PetValidation.validateDescription(val),
    },
    validateInputOnChange: true,
  });

  const handleCreatePet = (pet: Pet) => {
    postPet();
    close();
    if (error) {
      notification.error("Could not create pet in system");
    } else {
      notification.success(`${pet.name} created`);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleCreatePet)}>
      <Stack justify="space-evenly">
        <PetImageSelect
          petImage={petImage}
          setPetimage={handleSetPetimage}></PetImageSelect>
        <TextInput
          withAsterisk
          label="Name"
          placeholder="Budapest"
          {...form.getInputProps("name")}
        />

        <Grid>
          <Grid.Col span={6}>
            <Select
              label="Species"
              withAsterisk
              data={getPetSpeciesValueLabel()}
              {...form.getInputProps("species")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <NumberInput
              label="Age"
              withAsterisk
              {...form.getInputProps("age")}
            />
          </Grid.Col>
        </Grid>
        <Textarea
          placeholder="Your text"
          label="Description"
          withAsterisk
          {...form.getInputProps("description")}
        />

        <Button type="submit">Submit</Button>
      </Stack>
    </form>
  );
}
