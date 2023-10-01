import { Button, PasswordInput, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useUpdateUserPassword } from "../hooks/UserHooks";
import { UserValidation } from "../models/User";

interface PasswordChangeModel {
  password: string;
  confirmPassword: string;
}
export default function ChangePassword() {
  const { updateUser } = useUpdateUserPassword();
  const [visible, { toggle }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: {
      password: (val) => UserValidation.passwordValidation(val),
      confirmPassword: (val, values) =>
        UserValidation.passwordSameValidation(values.password, val),
    },
  });

  const handleUpdate = (model: PasswordChangeModel) => {
    updateUser(model.password);
  };
  return (
    <form onSubmit={form.onSubmit(handleUpdate)}>
      <Stack justify="center" align="center">
        <PasswordInput
          label="Password"
          placeholder="Password"
          visible={visible}
          onVisibilityChange={toggle}
          {...form.getInputProps("password")}
          miw="250px"
        />
        <PasswordInput
          label="Confirm password"
          placeholder="Password"
          visible={visible}
          onVisibilityChange={toggle}
          {...form.getInputProps("confirmPassword")}
          miw="250px"
        />
        <Button type="submit">Update profile</Button>
      </Stack>
    </form>
  );
}
