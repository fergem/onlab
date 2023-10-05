import { Button, NumberInput, Stack, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  OwnerProfile,
  UpdateOwnerProfileModel,
} from "../../models/OwnerProfile";

export interface IEditOwnerProfile {
  currentOwnerProfile?: OwnerProfile;
  updateOwnerProfile(ownerProfile: UpdateOwnerProfileModel): void;
}

export default function EditOwnerProfile({
  currentOwnerProfile,
  updateOwnerProfile,
}: IEditOwnerProfile) {
  const form = useForm({
    initialValues: {
      description: currentOwnerProfile?.description ?? "",
      wage: currentOwnerProfile?.minWage ?? 0,
      experience: currentOwnerProfile?.minRequiredExperience ?? 0,
    },
    validate: {},
  });

  console.log(currentOwnerProfile);
  console.log(form.values);
  const updateDisabled =
    form.values.wage === currentOwnerProfile?.minWage &&
    form.values.experience === currentOwnerProfile?.minRequiredExperience &&
    form.values.description === currentOwnerProfile?.description;

  // useEffect(() => {
  //   form.setValues({
  //     location: user?.location ?? "",
  //     phoneNumber: user?.phoneNumber ?? "",
  //     payment: user?.ownerProfile?.minWage ?? 0,
  //     experience: user?.ownerProfile?.minRequiredExperience ?? 0,
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [user]);

  const handleUpdate = (model: UpdateOwnerProfileModel) => {
    updateOwnerProfile(model);
  };

  return (
    <form onSubmit={form.onSubmit(handleUpdate)}>
      <Stack justify="center" align="center">
        <Textarea
          label="Description"
          placeholder="This the petsitter will see when applying to your job"
          miw="250px"
          {...form.getInputProps("description")}
        />
        <NumberInput
          label="Your default minimum wage"
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          step={5}
          formatter={(value) =>
            !Number.isNaN(parseFloat(value))
              ? `$ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
              : "$ "
          }
          miw="250px"
          {...form.getInputProps("wage")}
        />
        <NumberInput
          label="Min. required years of exp. for petsitter"
          miw="250px"
          {...form.getInputProps("experience")}
        />
        <Button type="submit" disabled={updateDisabled}>
          Update owner profile
        </Button>
      </Stack>
    </form>
  );
}
