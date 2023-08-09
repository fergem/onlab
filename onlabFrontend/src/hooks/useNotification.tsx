import { useMantineTheme } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { CiSquareCheck } from "react-icons/ci";
export const useNotification = () => {
  const theme = useMantineTheme();

  const success = (message: string) =>
    notifications.show({
      withCloseButton: true,
      autoClose: 4000,
      title: "Success! :)",
      message: message,
      loading: false,
      withBorder: true,
      styles: (theme) => ({
        root: {
          "&::before": { backgroundColor: theme.colors.green },
        },
      }),
    });

  const error = (message: string) =>
    notifications.show({
      withCloseButton: true,
      autoClose: 4000,
      title: "Error. :(",
      message: message,
      loading: false,
      withBorder: true,
      styles: (theme) => ({
        root: {
          "&::before": { backgroundColor: theme.colors.red },
        },
      }),
    });

  const information = (message: string) =>
    notifications.show({
      withCloseButton: true,
      autoClose: 4000,
      title: "Information. ",
      message: message,
      loading: false,
      withBorder: true,
      styles: (theme) => ({
        root: {
          "&::before": { backgroundColor: theme.colors.blue },
        },
      }),
    });

  return { success, error, information };
};
