import App from "./App";

import { Tuple, DefaultMantineColor, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

type ExtendedCustomColors =
  | "grey"
  | "rosequartz"
  | "fergeblue"
  | "mayablue"
  | DefaultMantineColor;

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, Tuple<string, 10>>;
  }
}

export default function CustomMantineProvider() {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      inherit
      theme={{
        components: {
          Button: {
            defaultProps: (theme) => ({
              variant: "light",
              color: theme.colorScheme === "dark" ? "orange" : "indigo",
              size: "md",
            }),
          },
        },
      }}>
      <Notifications />
      <App />
    </MantineProvider>
  );
}
