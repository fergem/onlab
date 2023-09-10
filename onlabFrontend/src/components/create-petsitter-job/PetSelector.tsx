import { Group, Stack, Title, Text } from "@mantine/core";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useGetUserPets } from "../../hooks/UserHooks";
import Pet from "../../models/Pet";
import { baseDogPicture } from "../../utility/constants";
import LoadingBoundary from "../LoadingBoundary";
import SelectableImage from "../SelectableImage";

interface IProps {
  selectPets: (id: number) => void;
}

export const PetSelector: React.FC<IProps> = ({ selectPets }) => {
  const [pets, error, loading, refetch] = useGetUserPets();

  const handleSelectPets = (id: number) => {
    selectPets(id);
  };
  console.log(pets, loading, error);
  return (
    <Stack align="center" justify="center" spacing="xl">
      <Text>These pets will be added to your newly created job.</Text>
      <Group position="center" spacing="lg">
        <LoadingBoundary loading={loading} error={error} refetch={refetch}>
          {pets.length === 0 && (
            <Text align="center">You've got no pets yet.</Text>
          )}
          {pets?.map((s) => (
            <SelectableImage
              key={s.id}
              id={s.id}
              onClick={handleSelectPets}
              source={s.image?.picture ?? ""}
              title={s.name}></SelectableImage>
          ))}
        </LoadingBoundary>
      </Group>
    </Stack>
  );
};
