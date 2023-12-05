import { Group, Text } from "@mantine/core";
import { IconCat, IconDog } from "@tabler/icons-react";

interface IPetCountWithProps {
  dogCount?: number;
  catCount?: number;
}

export default function PetCountWithIcon({
  dogCount,
  catCount,
}: IPetCountWithProps) {
  return (
    <Group align="center" spacing={0}>
      {dogCount && dogCount > 0 && (
        <>
          <Text>{dogCount}</Text>
          <IconDog />
        </>
      )}
      {catCount && catCount > 0 && (
        <>
          <Text>{catCount}</Text>
          <IconCat />
        </>
      )}
    </Group>
  );
}
