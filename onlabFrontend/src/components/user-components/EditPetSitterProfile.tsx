import { Button, NumberInput, Stack, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  PetSitterProfile,
  UpdatePetSitterProfileModel,
} from "../../models/PetSitterProfile";

export interface IEditPetSitterProfile {
  currentPetSitterProfile?: PetSitterProfile;
  updatePetSitterProfile(PetSitterProfile: UpdatePetSitterProfileModel): void;
}

export default function EditPetSitterProfile({
  currentPetSitterProfile,
  updatePetSitterProfile,
}: IEditPetSitterProfile) {
  const form = useForm({
    initialValues: {
      description: currentPetSitterProfile?.description ?? "",
      acquiredExperience: currentPetSitterProfile?.acquiredExperience ?? 0,
    },
    validate: {},
  });

  const updateDisabled =
    form.values.acquiredExperience ===
      currentPetSitterProfile?.acquiredExperience &&
    form.values.description === currentPetSitterProfile?.description;

  // useEffect(() => {
  //   form.setValues({
  //     location: user?.location ?? "",
  //     phoneNumber: user?.phoneNumber ?? "",
  //     payment: user?.PetSitterProfile?.minWage ?? 0,
  //     experience: user?.PetSitterProfile?.minRequiredExperience ?? 0,
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [user]);

  const handleUpdate = (model: UpdatePetSitterProfileModel) => {
    updatePetSitterProfile(model);
  };

  return (
    <form onSubmit={form.onSubmit(handleUpdate)}>
      <Stack justify="center" align="center">
        <Textarea
          label="Description"
          placeholder="This is what the owner will see when applying for job"
          miw="250px"
          {...form.getInputProps("description")}
        />
        <NumberInput
          label="Acquired experience as a PetSitter"
          miw="250px"
          {...form.getInputProps("acquiredExperience")}
        />
        <Button type="submit" disabled={updateDisabled}>
          Update petsitter profile
        </Button>
      </Stack>
    </form>
  );
}
