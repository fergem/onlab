import { ActionIcon, Modal, ScrollArea, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import { useUpdateUserPet } from "../../hooks/react-query/UserHooks";
import { Pet, PetUpdateModel } from "../../models/Pet";
import PetForm from "./PetForm";

interface IPropsEditPetModal {
  pet: Pet;
}

export default function EditPetModal({ pet }: IPropsEditPetModal) {
  const { updatePet } = useUpdateUserPet();
  const [opened, { open, close }] = useDisclosure(false);

  const handleCreatePet = (petToUpdate: PetUpdateModel) => {
    updatePet(petToUpdate);
    close();
  };

  return (
    <>
      <Tooltip label="Edit pet">
        <ActionIcon
          variant="subtle"
          color="dark"
          radius="md"
          size="md"
          onClick={open}
        >
          <IconEdit />
        </ActionIcon>
      </Tooltip>

      <Modal
        opened={opened}
        onClose={close}
        title="Edit pet"
        size="lg"
        overlayProps={{
          opacity: 0.55,
          blur: 3,
        }}
        scrollAreaComponent={ScrollArea.Autosize}
      >
        <Modal.Body>
          <PetForm pet={pet} onCancel={close} onConfirm={handleCreatePet} />
        </Modal.Body>
      </Modal>
    </>
  );
}
