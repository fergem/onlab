import { Carousel } from "@mantine/carousel";
import {
  ActionIcon,
  Button,
  Group,
  Image,
  Modal,
  Paper,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconArrowBack, IconX } from "@tabler/icons-react";
import { useDeletePet } from "../../hooks/react-query/UserHooks";
import { Pet } from "../../models/Pet";
import { basePetPicture } from "../../utility/constants";

interface IPropsPetModal {
  pet: Pet;
  back(): void;
}

export default function EditPetModal({ pet, back }: IPropsPetModal) {
  const withIndicatorAndControls = !!pet.image && pet.image.length > 1;

  const { deletePet } = useDeletePet();

  const handleDelete = () => {
    deletePet(pet.id);
    close();
  };
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Modal opened={opened} onClose={close} withCloseButton={false} centered>
        <Stack>
          <Text>
            Are you sure you want to delete {pet.name}? If you do so this change
            is not revertable.
          </Text>
          <Group position="apart">
            <Button size="sm" onClick={close}>
              No, go back!
            </Button>
            <Button size="sm" color="red" onClick={handleDelete}>
              Yes.
            </Button>
          </Group>
        </Stack>
      </Modal>

      <Paper radius="md" shadow="sm" withBorder w="50%">
        <Group position="apart">
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
          <Tooltip label="Delete pet">
            <ActionIcon
              variant="subtle"
              color="dark"
              onClick={open}
              radius="md"
              size="lg"
              m="sm"
            >
              <IconX />
            </ActionIcon>
          </Tooltip>
        </Group>

        <Stack align="center" justify="space-evenly" spacing={5}>
          <Carousel
            w="13vw"
            height="13vw"
            mx="auto"
            withIndicators={withIndicatorAndControls}
            withControls={withIndicatorAndControls}
          >
            {pet.image && pet.image.length > 0 ? (
              pet.image.map((s) => (
                <Carousel.Slide key={s}>
                  <Image
                    src={`data:image/png;base64,${s}`}
                    radius="md"
                    width="13vw"
                    height="13vw"
                    alt={pet.name}
                  />
                </Carousel.Slide>
              ))
            ) : (
              <Image
                src={basePetPicture}
                radius="md"
                width="13vw"
                height="13vw"
                alt={pet.name}
              />
            )}
          </Carousel>
          <Text fw="bold">
            {pet.name} ({pet.age} years)
          </Text>
        </Stack>
      </Paper>
    </>
  );
}
