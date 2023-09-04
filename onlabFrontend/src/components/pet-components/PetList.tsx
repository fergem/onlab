import { Loader, Alert, Button, Grid, Stack, Image, Text } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { useGetUserPets } from "../../hooks/UserHooks";
import Pet from "../../models/Pet";
import { baseDogPicture } from "../../utility/constants";
import PetDialog from "./PetDialog";

interface IPropsPetCard {
  pet: Pet;
}

export default function PetList() {
  const [pets, error, loading, refetch] = useGetUserPets();

  if (loading) {
    return <Loader size="xl" />;
  } else if (error) {
    return (
      <>
        <Alert
          icon={<IconAlertCircle size="1rem" />}
          title="Bummer!"
          color="red">
          Something terrible happened! You made a mistake and there is no going
          back, your data was lost forever!
        </Alert>
        <Button onClick={() => refetch()}>Click me to try again!</Button>
      </>
    );
  }

  return (
    <Grid justify="center">
      {pets.map((x) => (
        <Grid.Col key={x.id}>
          <PetCard pet={x} />
        </Grid.Col>
      ))}
    </Grid>
  );
}

export function PetCard({ pet }: IPropsPetCard) {
  return (
    <Stack justify="center" align="center">
      <Image
        fit="contain"
        radius="md"
        maw="200px"
        miw="200px"
        height="200px"
        src={
          pet.image
            ? "data:image/png;base64," + pet.image.picture
            : baseDogPicture
        }
        alt="Green double couch with wooden legs"
      />
      <Text size="lg">{pet.name}</Text>
      {/* <PetDialog pet={pet} onClose={onClose} isOpen={isOpen}></PetDialog> */}
    </Stack>
  );
}
