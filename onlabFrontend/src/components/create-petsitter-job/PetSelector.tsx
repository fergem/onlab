import { Group, Stack, Text } from "@mantine/core";
import { useGetUserPets } from "../../hooks/react-query/UserHooks";
import LoadingBoundary from "../utility-components/LoadingBoundary";
import NavButton from "../utility-components/NavButton";
import SelectableCardWithImage from "../utility-components/SelectableCardWithImage";
import { CreateJobDetailsFormType } from "./CreateJobDetailsForm";

interface IProps {
  form: CreateJobDetailsFormType;
}
export default function PetSelector({ form }: IProps) {
  const { pets, error, loading, listPets } = useGetUserPets();

  const handleSelectPet = (id: number) => {
    if (form.values.petIDs.includes(id)) {
      const newPetIDs = form.values.petIDs.filter((s) => s !== id);
      form.setFieldValue("petIDs", newPetIDs);
    } else {
      form.setFieldValue("petIDs", [...form.values.petIDs, id]);
    }
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
              <NavButton name="Profile" to="/profile" />
            </Stack>
          )}
          {pets?.map((s) => (
            <SelectableCardWithImage
              key={s.id}
              id={s.id}
              onClick={handleSelectPet}
              source={s.image}
              title={s.name}
              selected={form.values.petIDs.includes(s.id)}
            />
          ))}
        </LoadingBoundary>
      </Group>
    </Stack>
  );
}
