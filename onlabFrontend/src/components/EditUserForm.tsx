import { Button, Group, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { useAuth } from "../hooks/AuthHooks";
import { useUpdateUser } from "../hooks/UserHooks";
import { UserInformation, UserValidation } from "../models/User";
import ProfilePicture from "./ProfilePicture";

export default function EditUserForm() {
  const { user } = useAuth();
  const { updateUser } = useUpdateUser();

  const form = useForm({
    initialValues: {
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      age: user?.age ?? 0,
      location: user?.location ?? "",
      email: user?.email ?? "",
      phoneNumber: user?.phoneNumber ?? "",
    },
    validate: {
      email: (val) => UserValidation.emailValidation(val),
    },
  });

  useEffect(() => {
    form.setValues({
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      age: user?.age ?? 0,
      location: user?.location ?? "",
      email: user?.email ?? "",
      phoneNumber: user?.phoneNumber ?? "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const updateDisabled =
    form.values.age === user?.age &&
    form.values.email === user?.email &&
    form.values.firstName === user?.firstName &&
    form.values.lastName === user?.lastName &&
    form.values.location === user?.location &&
    form.values.phoneNumber === user?.phoneNumber;

  const handleUpdate = (info: UserInformation) => {
    updateUser(info);
  };
  return (
    <Group grow spacing={0}>
      <ProfilePicture />
      <form onSubmit={form.onSubmit(handleUpdate)}>
        <Stack justify="center" align="center">
          <TextInput
            withAsterisk
            label="First Name"
            placeholder="John"
            miw="250px"
            {...form.getInputProps("firstName")}
          />
          <TextInput
            withAsterisk
            label="Last Name"
            placeholder="Doh"
            miw="250px"
            {...form.getInputProps("lastName")}
          />
          <TextInput
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            miw="250px"
            {...form.getInputProps("email")}
          />
          <Button type="submit" disabled={updateDisabled}>
            Update profile
          </Button>
        </Stack>
      </form>
    </Group>
  );
}
