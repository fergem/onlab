import { Modal, ScrollArea } from "@mantine/core";
import { usePostUserPet } from "../../hooks/UserHooks";
import { PetInsertModel } from "../../models/Pet";
import PetForm from "./PetForm";

interface IPropsPetModal {
  opened: boolean;
  onClose(): void;
}

export default function AddPetModal({ opened, onClose }: IPropsPetModal) {
  const { postPet } = usePostUserPet();

  const handleCreatePet = (petToInsert: PetInsertModel) => {
    console.log("asd");
    postPet(petToInsert);
    onClose();
  };
  console.log(opened);
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
