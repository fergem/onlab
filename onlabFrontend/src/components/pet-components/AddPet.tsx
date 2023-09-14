import { Image, Modal, Paper, ScrollArea, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconHeartPlus } from "@tabler/icons-react";
import { useRef } from "react";
import { addPetImage } from "../../utility/constants";
import AddPetForm from "./AddPetForm";

export default function AddPet() {
  const [opened, { open, close }] = useDisclosure(false);
  const initialRef = useRef(null);

  return (
    <>
      <Stack justify="center" align="center" onClick={open}>
        <Paper shadow="xs" p="md">
          <Image
            fit="contain"
            radius="md"
            maw="100px"
            height="100px"
            src={addPetImage}
          />
          <Text size="lg" align="center" mt="sm">
            Add pet
          </Text>
        </Paper>
      </Stack>
      <Modal
        opened={opened}
        onClose={close}
        title="Add pet"
        size="lg"
        overlayProps={{
          opacity: 0.55,
          blur: 3,
        }}
        scrollAreaComponent={ScrollArea.Autosize}>
        <Modal.Body>
          <AddPetForm close={close} />
        </Modal.Body>
      </Modal>
    </>
  );
}
