import { DefaultMantineColor, MantineProvider, Tuple } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import App from "./App";

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
            defaultProps: () => ({
              variant: "filled",
              color: "blue",
              size: "md",
            }),
          },
        },
      }}
    >
      <Notifications />
      <App />
    </MantineProvider>
  );
}
