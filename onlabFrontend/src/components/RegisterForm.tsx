import { Button, Paper, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthHooks";
import { useNotification } from "../hooks/useNotification";
import User, { RegisterModel } from "../models/User";

export default function RegisterForm() {
  const navigate: NavigateFunction = useNavigate();
  const { registerUser } = useAuth();
  const notification = useNotification();

  const form = useForm({
    initialValues: {
      userName: "",
      email: "",
      password: "",
    },
    validate: {
      userName: (val) => userNameValidation(val),
      email: (val) => emailValidation(val),
      password: (val) => passwordValidation(val),
    },
  });

  const userNameValidation = (val: string) => {
    if (val.length < 4) return "Username is too short";
    if (val.length > 10) return "Username is too long";
    return null;
  };

  const passwordValidation = (val: string) => {
    if (val.length < 4) return "Username is too short";
    if (val.length > 10) return "Username is too long";
    return null;
  };

  const emailValidation = (val: string) =>
    /^\S+@\S+$/.test(val) ? null : "Invalid email";

  const handleRegister = (registerModel: RegisterModel) => {
    registerUser(registerModel).then(
      () => {
        navigate("/login");
        notification.success("Successful registration");
      },
      (error) => {
        const resMessage =
          error?.response?.data?.message || error.message || error.toString();
        notification.error(resMessage);
      }
    );
  };

  return (
    <Paper shadow="sm" p="xl">
      <form onSubmit={form.onSubmit(handleRegister)}>
        <Stack>
          <TextInput
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps("email")}
          />
          <TextInput
            withAsterisk
            label="Username"
            placeholder="johndoe"
            {...form.getInputProps("userName")}
          />
          <TextInput
            withAsterisk
            label="Password"
            placeholder="blabla123"
            {...form.getInputProps("password")}
          />

          <Button type="submit">Submit</Button>
        </Stack>
      </form>
    </Paper>
  );
}
