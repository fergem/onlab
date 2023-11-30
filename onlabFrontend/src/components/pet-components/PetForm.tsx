import {
  Button,
  Grid,
  Group,
  NumberInput,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import {
  Pet,
  PetInsertModel,
  PetSpecies,
  PetUpdateModel,
  PetValidation,
  getPetSpeciesValueLabel,
} from "../../models/Pet";
import PetImageSelect from "./PetImageSelect";

interface IAddPetProps {
  pet?: Pet;
  onCancel(): void;
  onConfirm(pet: PetInsertModel | PetUpdateModel): void;
}

const defaultPet = {
  name: "",
  species: PetSpecies.Dog,
  age: 1,
} as Pet;

export default function PetForm({ pet, onCancel, onConfirm }: IAddPetProps) {
  const [petImage, setPetImage] = useState<File | undefined>();

  const handleSetPetimage = (files?: File) => {
    setPetImage(files);
  };

  const form = useForm({
    initialValues: pet ?? defaultPet,
    validate: {
      name: (val) => PetValidation.validateName(val),
    },
    validateInputOnChange: true,
  });

  const oldPetImage = getOldPetImage(pet);

  const handleOnConfirm = (valuePet: Pet) => {
    onConfirm({ ...valuePet, image: petImage });
  };

  return (
    <Stack>
      <form onSubmit={form.onSubmit(handleOnConfirm)}>
        <Stack justify="space-evenly">
          <Stack align="center">
            <PetImageSelect
              oldPetImage={oldPetImage}
              petImage={petImage}
              setPetImageFile={handleSetPetimage}
            />
          </Stack>

          <TextInput
            withAsterisk
            label="Name"
            placeholder="Max"
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
                min={0}
              />
            </Grid.Col>
          </Grid>
          <Group grow>
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">Confirm</Button>
          </Group>
        </Stack>
      </form>
    </Stack>
  );
}

function getOldPetImage(pet: Pet | undefined) {
  return pet && pet.image
    ? stringByteArrayToFile(
        pet.image,
        `${pet.name}.${pet.id}.picture`,
        "image/png"
      )
    : undefined;
}

function stringByteArrayToFile(
  str: string,
  fileName: string,
  fileType: string
): File {
  const uint8Array = base64ToUint8Array(str);
  const blob = uint8ArrayToBlob(uint8Array, fileType);
  const file = blobToFile(blob, fileName);
  return file;
}
function base64ToUint8Array(base64String: string): Uint8Array {
  const binaryString = atob(base64String);
  const len = binaryString.length;
  const uint8Array = new Uint8Array(len);

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < len; ++i) {
    uint8Array[i] = binaryString.charCodeAt(i);
  }

  return uint8Array;
}
function uint8ArrayToBlob(array: Uint8Array, type: string): Blob {
  return new Blob([array], { type });
}
function blobToFile(blob: Blob, fileName: string): File {
  return new File([blob], fileName, { type: blob.type });
}
