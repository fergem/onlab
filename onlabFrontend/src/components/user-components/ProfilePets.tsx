import { ScrollArea, Stack } from "@mantine/core";
import ProfilePetList from "../pet-components/PetList";

export default function ProfilePets() {
  return (
    <Stack>
      <ScrollArea h="100%" offsetScrollbars>
        <ProfilePetList editable />
      </ScrollArea>
    </Stack>
  );
}
