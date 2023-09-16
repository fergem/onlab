import { Center, Grid, Image, Paper, Stack, Text } from "@mantine/core";
import { useGetUserPets } from "../../hooks/UserHooks";
import Pet from "../../models/Pet";
import { baseDogPicture } from "../../utility/constants";
import LoadingBoundary from "../LoadingBoundary";
import AddPet from "./AddPet";

interface IPropsPetList {
  isAddingPet: boolean;
}

export default function PetList({ isAddingPet = false }: IPropsPetList) {
  const { pets, error, loading, listPets } = useGetUserPets();
  return (
    <LoadingBoundary loading={loading} error={error} refetch={listPets}>
      <Grid justify="center">
        {pets.map((x) => (
          <Grid.Col span={2} key={x.id}>
            <PetCard pet={x} />
          </Grid.Col>
        ))}
        {isAddingPet && !loading && (
          <Grid.Col span={pets.length > 0 ? 2 : 12}>
            <AddPet />
          </Grid.Col>
        )}
      </Grid>
    </LoadingBoundary>
  );
}

interface IPropsPetCard {
  pet: Pet;
}

export function PetCard({ pet }: IPropsPetCard) {
  return (
    <Stack justify="center" align="center">
      <Paper shadow="xs" p="md" withBorder>
        <Center>
          <Image
            fit="contain"
            radius="md"
            src={
              pet.image
                ? `data:image/png;base64,${pet.image.picture}`
                : baseDogPicture
            }
            alt="Green double couch with wooden legs"
          />
        </Center>

        <Text size="lg" align="center" mt="sm">
          {pet.name}
        </Text>
        {/* <PetDialog pet={pet} onClose={onClose} isOpen={isOpen}></PetDialog> */}
      </Paper>
    </Stack>
  );
}
