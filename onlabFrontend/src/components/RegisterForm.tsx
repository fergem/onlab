import { Button, Paper, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthHooks";
import useNotification from "../hooks/useNotification";
import { RegisterModel, UserValidation } from "../models/User";

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
      userName: (val) => UserValidation.userNameValidation(val),
      email: (val) => UserValidation.emailValidation(val),
      password: (val) => UserValidation.passwordValidation(val),
    },
  });

  const handleRegister = (registerModel: RegisterModel) => {
    registerUser(registerModel)
      .then(() => {
        navigate("/login");
        notification.success("Successful registration");
      })
      .catch((error) => {
        const resMessage =
          error?.response?.data?.message || error.message || error.toString();
        notification.error(resMessage);
      });
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
            type="password"
            {...form.getInputProps("password")}
          />

          <Button type="submit">Submit</Button>
        </Stack>
      </form>
    </Paper>
  );
}
