import { Group, Stack, Text } from "@mantine/core";
import { useGetUserPets } from "../../hooks/UserHooks";
import LoadingBoundary from "../LoadingBoundary";
import SelectableImage from "../SelectableImage";

interface IProps {
  selectPets: (id: number) => void;
}

export default function PetSelector({ selectPets }: IProps) {
  const { pets, error, loading, listPets } = useGetUserPets();

  const handleSelectPets = (id: number) => {
    selectPets(id);
  };
  return (
    <Stack align="center" justify="center" spacing="xl">
      <Text>These pets will be added to your newly created job.</Text>
      <Group position="center" spacing="lg">
        <LoadingBoundary loading={loading} error={error} refetch={listPets}>
          {pets.length === 0 && (
            <Text align="center">You have got no pets yet.</Text>
          )}
          {pets?.map((s) => (
            <SelectableImage
              key={s.id}
              id={s.id}
              onClick={handleSelectPets}
              source={s.image?.picture ?? ""}
              title={s.name}
            />
          ))}
        </LoadingBoundary>
      </Group>
    </Stack>
  );
}
