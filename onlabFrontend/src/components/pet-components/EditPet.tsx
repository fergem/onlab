import { Carousel } from "@mantine/carousel";
import { ActionIcon, Image, Paper, Stack, Text, Tooltip } from "@mantine/core";
import { IconArrowBack } from "@tabler/icons-react";
import Pet from "../../models/Pet";
import { basePetPicture } from "../../utility/constants";

interface IPropsPetModal {
  pet: Pet;
  back(): void;
}

export default function EditPetModal({ pet, back }: IPropsPetModal) {
  const withIndicatorAndControls = !!pet.images && pet.images.length > 1;

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
        <Carousel
          w="17vw"
          height="17vw"
          mx="auto"
          withIndicators={withIndicatorAndControls}
          withControls={withIndicatorAndControls}
        >
          {pet.images && pet.images.length > 0 ? (
            pet.images.map((s) => (
              <Carousel.Slide key={s}>
                <Image
                  src={`data:image/png;base64,${s}`}
                  radius="md"
                  width="17vw"
                  height="17vw"
                  alt={pet.name}
                />
              </Carousel.Slide>
            ))
          ) : (
            <Image
              src={basePetPicture}
              radius="md"
              width="17vw"
              height="17vw"
              alt={pet.name}
            />
          )}
        </Carousel>
        <Text>{pet.name}</Text>
        <Text>{pet.age}</Text>
        <Text>{pet.description}</Text>
      </Stack>
    </Paper>
  );
}
