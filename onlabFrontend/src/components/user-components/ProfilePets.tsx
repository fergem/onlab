import { ScrollArea, Stack } from "@mantine/core";
import PetListLoadingPets from "../pet-components/PetList";

export default function ProfilePets() {
  return (
    <Stack>
      <ScrollArea h="100%" offsetScrollbars>
        <PetListLoadingPets />
      </ScrollArea>
    </Stack>
  );
}
