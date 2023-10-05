import { Button, Group, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import {
  UpdateUserDetailsModel,
  UserDetailsWithoutProfiles,
  UserValidation,
} from "../../models/User";
import ProfilePicture from "./ProfilePicture";

export interface IEditUserDetails {
  currentUserDetails?: UserDetailsWithoutProfiles;
  updateUserDetails(newDetails: UpdateUserDetailsModel): void;
}

export default function EditUserDetails({
  currentUserDetails,
  updateUserDetails,
}: IEditUserDetails) {
  const form = useForm({
    initialValues: {
      firstName: currentUserDetails?.firstName ?? "",
      lastName: currentUserDetails?.lastName ?? "",
      location: currentUserDetails?.location ?? "",
      email: currentUserDetails?.email ?? "",
      phoneNumber: currentUserDetails?.phoneNumber ?? "",
    },
    validate: {
      email: (val) => UserValidation.emailValidation(val),
    },
  });

  useEffect(() => {
    form.setValues({
      firstName: currentUserDetails?.firstName ?? "",
      lastName: currentUserDetails?.lastName ?? "",
      location: currentUserDetails?.location ?? "",
      email: currentUserDetails?.email ?? "",
      phoneNumber: currentUserDetails?.phoneNumber ?? "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUserDetails]);

  const updateDisabled =
    form.values.email === currentUserDetails?.email &&
    form.values.firstName === currentUserDetails?.firstName &&
    form.values.lastName === currentUserDetails?.lastName &&
    form.values.location === currentUserDetails?.location &&
    form.values.phoneNumber === currentUserDetails?.phoneNumber;

  const handleUpdate = (model: UpdateUserDetailsModel) => {
    updateUserDetails(model);
  };

  return (
    <Group grow spacing={0}>
      <ProfilePicture picture={currentUserDetails?.picture} />
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
          <Button type="submit" disabled={updateDisabled}>
            Update profile
          </Button>
        </Stack>
      </form>
    </Group>
  );
}
