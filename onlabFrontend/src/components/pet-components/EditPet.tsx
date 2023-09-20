import { ActionIcon, Image, Paper, Stack, Text, Tooltip } from "@mantine/core";
import { IconArrowBack } from "@tabler/icons-react";
import Pet from "../../models/Pet";
import { basePetPicture } from "../../utility/constants";

interface IPropsPetModal {
  pet: Pet;
  back(): void;
}

export default function EditPetModal({ pet, back }: IPropsPetModal) {
  return (
    <Paper radius="md" shadow="sm" withBorder>
      <Tooltip label="Back">
        <ActionIcon
          variant="subtle"
          color="dark"
          onClick={back}
          radius="md"
          size="lg"
          m="sm"
        >
          <IconArrowBack />
        </ActionIcon>
      </Tooltip>
      <Stack align="center">
        <Image
          height="10vw"
          width="10vw"
          radius="md"
          src={
            pet.image
              ? `data:image/png;base64,${pet.image.picture}`
              : basePetPicture
          }
          alt="Green double couch with wooden legs"
        />
        <Text>{pet.name}</Text>
        <Text>{pet.age}</Text>
        <Text>{pet.description}</Text>
      </Stack>
    </Paper>
  );
}
