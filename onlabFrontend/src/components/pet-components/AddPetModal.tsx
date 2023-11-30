import { Modal, ScrollArea } from "@mantine/core";
import { usePostUserPet } from "../../hooks/react-query/UserHooks";
import { PetInsertModel } from "../../models/Pet";
import PetForm from "./PetForm";

interface IPropsAddPetModal {
  opened: boolean;
  onClose(): void;
}

export default function AddPetModal({ opened, onClose }: IPropsAddPetModal) {
  const { postPet } = usePostUserPet();

  const handleCreatePet = (petToInsert: PetInsertModel) => {
    postPet(petToInsert);
    onClose();
  };
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Add pet"
      size="lg"
      overlayProps={{
        opacity: 0.55,
        blur: 3,
      }}
      scrollAreaComponent={ScrollArea.Autosize}
    >
      <Modal.Body>
        <PetForm onCancel={onClose} onConfirm={handleCreatePet} />
      </Modal.Body>
    </Modal>
  );
}