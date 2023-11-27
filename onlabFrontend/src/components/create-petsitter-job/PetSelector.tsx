import { Group, Stack, Text } from "@mantine/core";
import { useGetUserPets } from "../../hooks/react-query/UserHooks";
import LoadingBoundary from "../utility-components/LoadingBoundary";
import NavButton from "../utility-components/NavButton";
import SelectableImage from "../utility-components/SelectableImage";

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
        <LoadingBoundary
          loading={loading}
          error={error}
          refetch={listPets}
          withBorder={false}
        >
          {pets.length === 0 && (
            <Stack align="center" justify="center">
              <Text align="center">
                You have got no pets yet. Go to your profile and add one
              </Text>
              <NavButton name="Profile" to="/profile" icon={undefined} />
            </Stack>
          )}
          {pets?.map((s) => (
            <SelectableImage
              key={s.id}
              id={s.id}
              onClick={handleSelectPets}
              source={s.image && s.image[1]}
              title={s.name}
            />
          ))}
        </LoadingBoundary>
      </Group>
    </Stack>
  );
}
