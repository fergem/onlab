import { Grid, Image, Paper, Stack, Text } from "@mantine/core";
import { useGetUserPets } from "../../hooks/UserHooks";
import Pet from "../../models/Pet";
import { baseDogPicture } from "../../utility/constants";
import LoadingBoundary from "../LoadingBoundary";
import AddPet from "./AddPet";

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
  return (
    <Grid justify="center">
      {pets?.map((x) => (
        <Grid.Col span="content" key={x.id}>
          <PetCard pet={x} />
        </Grid.Col>
      ))}
      <Grid.Col span={pets ? 2 : 12}>
        <AddPet />
      </Grid.Col>
    </Grid>
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
        {/* <PetDialog pet={pet} onClose={onClose} isOpen={isOpen}></PetDialog> */}
      </Paper>
    </Stack>
  );
}
