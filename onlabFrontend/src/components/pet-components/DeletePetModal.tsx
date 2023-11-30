import {
  ActionIcon,
  Button,
  Group,
  Modal,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";
import { useDeletePet } from "../../hooks/react-query/UserHooks";
import { Pet } from "../../models/Pet";

interface IPropsPetModal {
  pet: Pet;
}

export default function DeletePetModal({ pet }: IPropsPetModal) {
  const [opened, { open, close }] = useDisclosure(false);
  const { deletePet } = useDeletePet();
  const handleDelete = () => {
    deletePet(pet.id);
    close();
  };
  return (
    <>
      <Tooltip label="Delete pet">
        <ActionIcon
          variant="subtle"
          color="dark"
          radius="md"
          size="md"
          onClick={open}
        >
          <IconX />
        </ActionIcon>
      </Tooltip>
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
    </>
  );
}
