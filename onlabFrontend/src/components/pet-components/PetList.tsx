import { Grid, Group, Image, Paper, Stack, Text, Title } from "@mantine/core";
import { IconCat, IconDog, IconMoodSad } from "@tabler/icons-react";
import { useGetUserPets } from "../../hooks/react-query/UserHooks";
import { Pet, PetSpecies } from "../../models/Pet";
import { basePetPicture } from "../../utility/constants";
import { ImageFunctions } from "../../utility/image";
import LoadingBoundary from "../utility-components/LoadingBoundary";
import DeletePetModal from "./DeletePetModal";
import EditPetModal from "./EditPetModal";

interface IPropsPetListLoadingPets {
  editable?: boolean;
}

export default function ProfilePetList({ editable }: IPropsPetListLoadingPets) {
  const { pets, error, loading, listPets } = useGetUserPets();
  return (
    <LoadingBoundary
      loading={loading}
      error={error}
      refetch={listPets}
      withBorder={false}
    >
      <PetGrid pets={pets} editable={editable} />
      {pets.length === 0 && (
        <Stack align="center" justify="center" my={20}>
          <IconMoodSad size={130} />
          <Title order={3} size={20}>
            No pets yet, consider adding one with the plus icon.
          </Title>
        </Stack>
      )}
    </LoadingBoundary>
  );
}

interface IPropsPetGrid {
  pets?: Pet[];
  editable?: boolean;
}

export function PetGrid({ pets, editable }: IPropsPetGrid) {
  return (
    <Stack align="center">
      <Grid justify="center">
        {pets?.map((pet) => (
          <Grid.Col span="content" key={pet.id}>
            <PetCard pet={pet} editable={editable} />
          </Grid.Col>
        ))}
      </Grid>
    </Stack>
  );
}

interface IPropsPetCard {
  editable?: boolean;
  pet: Pet;
}

export function PetCard({ pet, editable }: IPropsPetCard) {
  return (
    <Stack justify="center" align="center" h="100%">
      <Paper p="md" shadow="sm" radius="5%" withBorder>
        {editable && (
          <Group position="apart" mb="xs">
            <EditPetModal pet={pet} />
            <DeletePetModal pet={pet} />
          </Group>
        )}
        <Image
          height="8vw"
          width="8vw"
          radius="md"
          src={ImageFunctions.toDisplayImage(basePetPicture, pet.image)}
          alt="Green double couch with wooden legs"
        />
        <Group align="center" position="center" mt="sm" spacing={2}>
          {pet.species === PetSpecies.Cat ? (
            <IconCat size={20} />
          ) : (
            <IconDog size={20} />
          )}

          <Text size="sm" align="center">
            {pet.name}
          </Text>
          <Text size="sm" align="center">
            ({pet.age})
          </Text>
        </Group>
      </Paper>
    </Stack>
  );
}
