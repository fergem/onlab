import { Group, Stack, Text } from "@mantine/core";
import { useGetUserPets } from "../../hooks/UserHooks";
import LoadingBoundary from "../LoadingBoundary";
import NavButton from "../NavButton";
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
      {pets.length > 0 && (
        <Text>These pets will be added to your newly created job.</Text>
      )}
      <Group position="center" align="center" w="100%">
        <LoadingBoundary loading={loading} error={error} refetch={listPets}>
          {pets.length === 0 && (
            <Stack align="center" justify="center">
              <Text align="center">
                You have got no pets yet. Go to your profile and add one
              </Text>
              <NavButton name="Profile" route="/profile" />
            </Stack>
          )}
          {pets?.map((s) => (
            <SelectableImage
              key={s.id}
              id={s.id}
              onClick={handleSelectPets}
              source={s.image?.picture}
              title={s.name}
            />
          ))}
        </LoadingBoundary>
      </Group>
    </Stack>
  );
}
