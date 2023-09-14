import { Button, Paper, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthHooks";
import useNotification from "../hooks/useNotification";
import { LoginModel, UserValidation } from "../models/User";

export default function LoginForm() {
  const navigate: NavigateFunction = useNavigate();
  const { loginUser } = useAuth();
  const notification = useNotification();
  // const formStorage = useFormStorage();

  const form = useForm({
    initialValues: {
      userName: "",
      password: "",
    },
    validate: {
      userName: (val) => UserValidation.userNameValidation(val),
      password: (val) => UserValidation.passwordValidation(val),
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
        form.setErrors({
          userName: <p>Paragraph error</p>,
          password: "User does not exist",
        });
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
            type="password"
            {...form.getInputProps("password")}
          />
          <Button type="submit">Submit</Button>
        </Stack>
      </form>
    </Paper>
  );
}
