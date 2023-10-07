import {
  Button,
  Checkbox,
  Group,
  Paper,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/react-query/AuthHooks";
import useNotification from "../../hooks/useNotification";
import { RegisterModel, UserValidation } from "../../models/User";

export default function RegisterForm() {
  const navigate: NavigateFunction = useNavigate();
  const { registerUser } = useAuth();
  const notification = useNotification();
  // const [roles, setRoles] = useState<UserRoles[]>([]);

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
    <Paper shadow="sm" p="xl">
      <form onSubmit={form.onSubmit(handleRegister)}>
        <Stack>
          <Stack align="center" spacing={0}>
            <Text>Please choose the roles you want to take</Text>
            <Text fz={13}>(You can take both)</Text>
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
            placeholder="blabla123"
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
