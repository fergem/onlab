import {
  Loader,
  Alert,
  Button,
  Grid,
  Stack,
  Image,
  Text,
  Title,
  Paper,
  Box,
} from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { useGetUserPets } from "../../hooks/UserHooks";
import Pet from "../../models/Pet";
import { baseDogPicture } from "../../utility/constants";
import LoadingBoundary from "../LoadingBoundary";
import AddPet from "./AddPet";
import PetDialog from "./PetDialog";

interface IPropsPetList {
  isAddingPet: boolean;
}

export default function PetList({ isAddingPet = false }: IPropsPetList) {
  const [pets, error, loading, refetch] = useGetUserPets();
  console.log(pets);
  return (
    <LoadingBoundary loading={loading} error={error} refetch={refetch}>
      <Grid justify="center">
        {pets.map((x) => (
          <Grid.Col span={2} key={x.id}>
            <PetCard pet={x} />
          </Grid.Col>
        ))}
        {isAddingPet && !loading && (
          <Grid.Col span={2}>
            <AddPet></AddPet>
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
        <Box maw="100px" mah="100px">
          <Image
            fit="contain"
            radius="md"
            src={
              pet.image
                ? "data:image/png;base64," + pet.image.picture
                : baseDogPicture
            }
            alt="Green double couch with wooden legs"
          />
        </Box>

        <Text size="lg" align="center" mt="sm">
          {pet.name}
        </Text>
        {/* <PetDialog pet={pet} onClose={onClose} isOpen={isOpen}></PetDialog> */}
      </Paper>
    </Stack>
  );
}
