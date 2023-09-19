import { ActionIcon, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import AddPetModal from "./AddPetModal";

export default function AddPet() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Tooltip label="Add pet">
        <ActionIcon
          variant="subtle"
          color="dark"
          onClick={open}
          radius="md"
          size="lg"
        >
          <IconPlus />
        </ActionIcon>
      </Tooltip>

      <AddPetModal opened={opened} onClose={close} />
    </>
  );
}
