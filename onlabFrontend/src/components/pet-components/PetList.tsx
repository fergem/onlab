import { Grid, Image, Paper, Stack, Text } from "@mantine/core";
import { useState } from "react";
import { useGetUserPets } from "../../hooks/UserHooks";
import Pet from "../../models/Pet";
import { baseDogPicture } from "../../utility/constants";
import LoadingBoundary from "../LoadingBoundary";
import EditPet from "./EditPet";

interface IPropsPetGrid {
  pets?: Pet[];
}

export default function PetListLoadingPets() {
  const { pets, error, loading, listPets } = useGetUserPets();
  return (
    <LoadingBoundary loading={loading} error={error} refetch={listPets}>
      <PetGrid pets={pets} />
    </LoadingBoundary>
  );
}

export function PetGrid({ pets }: IPropsPetGrid) {
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const handleSelectPet = (pet: Pet | null) => {
    setSelectedPet(pet);
  };

  const handleDeselectPet = () => {
    setSelectedPet(null);
  };

  return (
    <>
      {!selectedPet && (
        <Grid justify="center">
          {pets?.map((x) => (
            <Grid.Col
              span="content"
              key={x.id}
              onClick={() => handleSelectPet(x)}
            >
              <PetCard pet={x} />
            </Grid.Col>
          ))}
        </Grid>
      )}
      {selectedPet && <EditPet pet={selectedPet} back={handleDeselectPet} />}
    </>
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
          height="7vw"
          width="7vw"
          radius="md"
          src={
            pet.image
              ? `data:image/png;base64,${pet.image.picture}`
              : baseDogPicture
          }
          alt="Green double couch with wooden legs"
        />

        <Text size="sm" align="center" mt="sm">
          {pet.name}
        </Text>
      </Paper>
    </Stack>
  );
}
