import { Grid, Image, Paper, Stack, Text } from "@mantine/core";
import { useState } from "react";
import { useGetUserPets } from "../../hooks/react-query/UserHooks";
import { Pet } from "../../models/Pet";
import { basePetPicture } from "../../utility/constants";
import { ImageFunctions } from "../../utility/image";
import LoadingBoundary from "../utility-components/LoadingBoundary";
import EditPet from "./EditPet";

interface IPropsPetGrid {
  pets?: Pet[];
  editable?: boolean;
}

export default function PetListLoadingPets() {
  const { pets, error, loading, listPets } = useGetUserPets();
  return (
    <LoadingBoundary
      loading={loading}
      error={error}
      refetch={listPets}
      withBorder={false}
    >
      <PetGrid pets={pets} />
    </LoadingBoundary>
  );
}

export function PetGrid({ pets, editable }: IPropsPetGrid) {
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const handleSelectPet = (pet: Pet | null) => {
    if (editable) setSelectedPet(pet);
  };

  const handleDeselectPet = () => {
    if (editable) setSelectedPet(null);
  };

  return (
    <Stack align="center">
      {!selectedPet && (
        <Grid justify="center">
          {pets?.map((pet) => (
            <Grid.Col
              span="content"
              key={pet.id}
              onClick={() => handleSelectPet(pet)}
            >
              <PetCard pet={pet} />
            </Grid.Col>
          ))}
        </Grid>
      )}
      {editable && selectedPet && (
        <EditPet pet={selectedPet} back={handleDeselectPet} />
      )}
    </Stack>
  );
}

interface IPropsPetCard {
  pet: Pet;
}

export function PetCard({ pet }: IPropsPetCard) {
  return (
    <Stack justify="center" align="center" h="100%">
      <Paper shadow="xs" p="md" withBorder>
        <Image
          height="8vw"
          width="8vw"
          radius="md"
          src={ImageFunctions.toDisplayImage(basePetPicture, pet.image)}
          alt="Green double couch with wooden legs"
        />

        <Text size="sm" align="center" mt="sm">
          {pet.name}
        </Text>
      </Paper>
    </Stack>
  );
}
