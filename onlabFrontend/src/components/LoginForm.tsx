import { Paper, Stack, TextInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthHooks";
import { useNotification } from "../hooks/useNotification";
import { LoginModel, Validation } from "../models/User";

export default function LoginForm() {
  let navigate: NavigateFunction = useNavigate();
  const { loginUser } = useAuth();
  const notification = useNotification();

  const form = useForm({
    initialValues: {
      userName: "",
      email: "",
      password: "",
    },
    validate: {
      userName: (val) => Validation.userNameValidation(val),
      password: (val) => Validation.passwordValidation(val),
    },
  });

  const handleLogin = (loginModel: LoginModel) => {
    loginUser(loginModel)
      .then(() => {
        navigate("/jobs");
      })
      .catch((error) => {
        const resMessage =
          error?.response?.data?.message || error.message || error.toString();
        notification.error(resMessage);
      });
  };

  return (
    <Paper shadow="sm" p="xl">
      <form onSubmit={form.onSubmit(handleLogin)}>
        <Stack>
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
