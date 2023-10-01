import { Button, NumberInput, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { useAuth } from "../hooks/AuthHooks";

export default function EditAdditionalInfo() {
  const { user } = useAuth();

  const form = useForm({
    initialValues: {
      location: user?.location ?? "",
      phoneNumber: user?.phoneNumber ?? "",
      payment: user?.ownerProfile?.minWage ?? 0,
      experience: user?.ownerProfile?.minRequiredExperience ?? 0,
    },
    validate: {},
  });

  const updateDisabled =
    form.values.payment === user?.ownerProfile?.minWage &&
    form.values.experience === user?.ownerProfile?.minRequiredExperience &&
    form.values.location === user?.location &&
    form.values.phoneNumber === user?.phoneNumber;

  useEffect(() => {
    form.setValues({
      location: user?.location ?? "",
      phoneNumber: user?.phoneNumber ?? "",
      payment: user?.ownerProfile?.minWage ?? 0,
      experience: user?.ownerProfile?.minRequiredExperience ?? 0,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleUpdate = (info: UserInformation) => {
    updateUser(info);
  };

  return (
    <form onSubmit={form.onSubmit(handleUpdate)}>
      <Stack justify="center" align="center">
        <TextInput
          label="Location"
          placeholder="Budapest"
          miw="250px"
          {...form.getInputProps("location")}
        />
        <TextInput
          label="Phone number"
          placeholder="+36709912323"
          miw="250px"
          {...form.getInputProps("phoneNumber")}
        />
        <NumberInput
          label="Payment by hours"
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          step={5}
          formatter={(value) =>
            !Number.isNaN(parseFloat(value))
              ? `$ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
              : "$ "
          }
          miw="250px"
          {...form.getInputProps("payment")}
        />
        <NumberInput
          label="Min. years of experience"
          miw="250px"
          {...form.getInputProps("experience")}
        />
        <Button type="submit" disabled={updateDisabled}>
          Update profile
        </Button>
      </Stack>
    </form>
  );
}
