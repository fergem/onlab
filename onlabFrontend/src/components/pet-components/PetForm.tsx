import {
  Button,
  Grid,
  Group,
  NumberInput,
  Select,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import Pet, {
  getPetSpeciesValueLabel,
  PetInsertModel,
  PetSpecies,
  PetValidation,
} from "../../models/Pet";
import PetImageSelect from "./PetImageSelect";

interface IAddPetProps {
  onCancel(): void;
  onConfirm(pet: PetInsertModel): void;
  pet?: Pet;
  petPicture?: File;
}

const defaultPet = {
  name: "",
  description: "",
  species: PetSpecies.Dog,
  age: 1,
} as Pet;

export default function PetForm({
  pet,
  petPicture,
  onCancel,
  onConfirm,
}: IAddPetProps) {
  const [petImage, setPetImage] = useState<File | undefined>(petPicture);
  const handleSetPetimage = (file: File) => {
    setPetImage(file);
  };

  const form = useForm({
    initialValues: pet ?? defaultPet,
    validate: {
      name: (val) => PetValidation.validateName(val),
      description: (val) => PetValidation.validateDescription(val),
    },
    validateInputOnChange: true,
  });

  const handleOnConfirm = (valuePet: Pet) => {
    onConfirm({ ...valuePet, picture: petImage });
  };

  return (
    <>
      <form onSubmit={form.onSubmit(handleOnConfirm)}>
        <Stack justify="space-evenly">
          <PetImageSelect petImage={petImage} setPetimage={handleSetPetimage} />
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
        </Stack>
      </form>
      <Group grow>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Confirm</Button>
      </Group>
    </>
  );
}
