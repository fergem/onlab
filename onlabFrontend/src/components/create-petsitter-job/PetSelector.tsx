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
  pets: Pet[];
  error: boolean;
  loading: boolean;
  selectPets: (id: number) => void;
}

export const PetSelector: React.FC<IProps> = ({
  pets,
  error,
  loading,
  selectPets,
}) => {
  const handleSelectPets = (id: number) => {
    selectPets(id);
  };

  return (
    <Stack align="center" justify="center" spacing="xl">
      <Text>These pets will be added to your newly created job.</Text>
      <Group position="center" spacing="lg">
        <LoadingBoundary loading={loading} error={error}>
          {pets?.map((s) => (
            <SelectableImage
              key={s.id}
              id={s.id}
              onClick={handleSelectPets}
              source={s.image?.picture}
              title={s.name}></SelectableImage>
          ))}
        </LoadingBoundary>
      </Group>
    </Stack>
  );
};
