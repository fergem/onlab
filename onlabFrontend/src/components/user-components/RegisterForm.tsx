import {
  Button,
  Checkbox,
  Group,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/react-query/AuthHooks";
import useNotification from "../../hooks/useNotification";
import { RegisterModel, UserValidation } from "../../models/User";

const REGISTRATION_HEIGHT = 568;

export default function RegisterForm() {
  const navigate = useNavigate();
  const { registerUser } = useAuth();
  const notification = useNotification();

  const form = useForm({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      isOwner: false,
      isPetSitter: false,
    },
    validate: {
      userName: (val) => UserValidation.userNameValidation(val),
      email: (val) => UserValidation.emailValidation(val),
      password: (val) => UserValidation.passwordValidation(val),
      firstName: isNotEmpty("Enter your first name"),
      lastName: isNotEmpty("Enter your last name"),
      isOwner: (val, vals) =>
        UserValidation.roleValidation(val, vals.isPetSitter),
      isPetSitter: (val, vals) =>
        UserValidation.roleValidation(val, vals.isOwner),
    },
    validateInputOnBlur: true,
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

  useEffect(() => {
    if (form.isTouched()) {
      form.validateField("isOwner");
      form.validateField("isPetSitter");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.values.isOwner, form.values.isPetSitter]);

  return (
    <Paper shadow="sm" p="xl" withBorder>
      <form onSubmit={form.onSubmit(handleRegister)}>
        <Stack mih={REGISTRATION_HEIGHT} justify="space-between">
          <Title order={2} align="center">
            Registration
          </Title>
          <Group noWrap miw="250px">
            <TextInput
              withAsterisk
              label="First Name"
              placeholder="John"
              {...form.getInputProps("firstName")}
            />
            <TextInput
              withAsterisk
              label="Last Name"
              placeholder="Doe"
              {...form.getInputProps("lastName")}
            />
          </Group>
          <Stack align="center" spacing={0}>
            <Text>Please choose the roles you want to take</Text>
            <Group mt="xs" miw="250px" position="center">
              <Checkbox
                {...form.getInputProps("isOwner", { type: "checkbox" })}
                label="Owner"
              />
              <Checkbox
                {...form.getInputProps("isPetSitter", { type: "checkbox" })}
                label="Pet Sitter"
              />
            </Group>
          </Stack>
          <TextInput
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps("email")}
            miw="250px"
          />
          <TextInput
            withAsterisk
            label="Username"
            placeholder="johndoe"
            {...form.getInputProps("userName")}
            miw="250px"
          />
          <TextInput
            withAsterisk
            label="Password"
            placeholder="yourpassword"
            type="password"
            {...form.getInputProps("password")}
            miw="250px"
          />
          <Button type="submit">Submit</Button>
        </Stack>
      </form>
    </Paper>
  );
}
