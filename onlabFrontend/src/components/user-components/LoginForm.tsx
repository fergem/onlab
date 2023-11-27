import { Button, Paper, Stack, TextInput, Title } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/react-query/AuthHooks";
import useNotification from "../../hooks/useNotification";
import { LoginModel } from "../../models/User";

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
      userName: isNotEmpty("Enter a username"),
      password: isNotEmpty("Enter a password"),
    },
  });

  const handleLogin = (loginModel: LoginModel) => {
    loginUser(loginModel)
      .then(() => {
        navigate("/jobs");
        notification.success("Successful login");
      })
      .catch((error) => {
        notification.error(error.response.data);
        if (error.response.data === "User not exists") {
          form.setErrors({
            userName: "User not exists",
          });
        } else if (error.response.data === "Incorrect password") {
          form.setErrors({
            password: "Incorrect password",
          });
        }
      });
  };

  return (
    <Paper shadow="sm" p="xl" withBorder>
      <form onSubmit={form.onSubmit(handleLogin)}>
        <Stack>
          <Title order={3} align="center" mb={10}>
            Login
          </Title>
          <TextInput
            withAsterisk
            label="Username"
            placeholder="johndoe"
            {...form.getInputProps("userName")}
          />
          <TextInput
            withAsterisk
            label="Password"
            placeholder="yourpassword"
            type="password"
            {...form.getInputProps("password")}
          />
          <Button type="submit">Submit</Button>
        </Stack>
      </form>
    </Paper>
  );
}
