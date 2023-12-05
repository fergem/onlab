import { Button, PasswordInput, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useUpdateUserPassword } from "../../hooks/react-query/UserHooks";
import { UpdatePasswordModel, UserValidation } from "../../models/User";

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

  const updateDisabled =
    form.values.password.length === 0 ||
    form.values.confirmPassword.length === 0;
  const handleUpdate = (model: UpdatePasswordModel) => {
    updateUser(model);
    form.reset();
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
        <Button type="submit" disabled={updateDisabled}>
          Update password
        </Button>
      </Stack>
    </form>
  );
}
