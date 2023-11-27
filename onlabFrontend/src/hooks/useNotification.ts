import { useMantineTheme } from "@mantine/core";
import { notifications } from "@mantine/notifications";

const useNotification = () => {
  const theme = useMantineTheme();

  const success = (message: string) =>
    notifications.show({
      withCloseButton: true,
      autoClose: 4000,
      title: "Success! :)",
      message,
      loading: false,
      withBorder: true,
      styles: () => ({
        root: {
          "&::before": { backgroundColor: theme.colors.green },
        },
      }),
    });

  const error = (message?: string) =>
    notifications.show({
      withCloseButton: true,
      autoClose: 4000,
      title: "Error. :(",
      message,
      loading: false,
      withBorder: true,
      styles: () => ({
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
      message,
      loading: false,
      withBorder: true,
      styles: () => ({
        root: {
          "&::before": { backgroundColor: theme.colors.blue },
        },
      }),
    });

  return { success, error, information };
};

export default useNotification;
