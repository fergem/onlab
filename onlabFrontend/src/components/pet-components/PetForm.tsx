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
import {
  getPetSpeciesValueLabel,
  Pet,
  PetInsertModel,
  PetSpecies,
  PetValidation,
} from "../../models/Pet";
import PetImageSelect from "./PetImageSelect";

interface IAddPetProps {
  onCancel(): void;
  onConfirm(pet: PetInsertModel): void;
}

const defaultPet = {
  name: "",
  species: PetSpecies.Dog,
  age: 1,
} as Pet;

export default function PetForm({ onCancel, onConfirm }: IAddPetProps) {
  const [petImage, setPetImage] = useState<File[] | undefined>();

  const handleSetPetimage = (files: File[]) => {
    setPetImage(files);
  };

  const form = useForm({
    initialValues: defaultPet,
    validate: {
      name: (val) => PetValidation.validateName(val),
    },
    validateInputOnChange: true,
  });

  const handleOnConfirm = (valuePet: Pet) => {
    onConfirm({ ...valuePet, images: petImage });
  };
  return (
    <Stack>
      <form onSubmit={form.onSubmit(handleOnConfirm)}>
        <Stack justify="space-evenly">
          <PetImageSelect
            petImage={petImage}
            setPetImageFiles={handleSetPetimage}
          />
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
        <Group grow>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Confirm</Button>
        </Group>
      </form>
    </Stack>
  );
}
