import App from "./App";

import { Tuple, DefaultMantineColor, MantineProvider } from "@mantine/core";

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
        colors: {
          gray: [
            "#ECF0F8",
            "#CAD5EC",
            "#A9BAE0",
            "#879FD4",
            "#6584C8",
            "#4469BB",
            "#365496",
            "#293F70",
            "#1B2A4B",
            "#0E1526",
          ],
          rosequartz: [
            "#F4F0F1",
            "#E1D6D9",
            "#CDBBC1",
            "#BAA1A8",
            "#A78690",
            "#936C78",
            "#765660",
            "#584148",
            "#3B2B30",
            "#1D1618",
          ],
          fergeblue: [
            "#EEF0F6",
            "#D1D6E6",
            "#B3BCD6",
            "#95A2C6",
            "#7787B6",
            "#596DA6",
            "#475785",
            "#354164",
            "#242C42",
            "#121621",
          ],
          mayablue: [
            "#E8F4FC",
            "#C0E1F7",
            "#97CFF2",
            "#6EBCEC",
            "#46A9E7",
            "#1D96E2",
            "#1778B5",
            "#115A88",
            "#0C3C5A",
            "#061E2D",
          ],
        },
        components: {
          Button: {
            defaultProps: (theme) => ({
              variant: "outline",
              color: theme.colorScheme === "dark" ? "orange" : "rosequartz",
              size: "md",
            }),
          },
          AppShell: {
            styles: (theme) => ({
              root: {
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? "orange"
                    : theme.colors.gray[0],
              },
            }),
          },
          Paper: {
            styles: (theme) => ({
              root: {
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? "orange"
                    : theme.colors.gray[1],
              },
            }),
          },
          Header: {
            styles: (theme) => ({
              root: {
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? "orange"
                    : theme.colors.gray[0],
              },
            }),
          },
        },
      }}>
      <App />
    </MantineProvider>
  );
}
