import { ActionIcon, Image, Stack, Tooltip } from "@mantine/core";
import { IconArrowBack } from "@tabler/icons-react";
import Pet from "../../models/Pet";
import { basePetPicture } from "../../utility/constants";

interface IPropsPetModal {
  pet: Pet;
  back(): void;
}

export default function EditPetModal({ pet, back }: IPropsPetModal) {
  return (
    <Fieldset legend="Pet information" radius="md">
      <Tooltip label="Back">
        <ActionIcon
          variant="subtle"
          color="dark"
          onClick={back}
          radius="md"
          size="lg"
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
      </Stack>
    </Fieldset>
  );
}
