import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: "#EAEFD3",
        color: "#505168",
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        borderWidth: "1px",
        backgroundColor: "#EAEFD3",
        borderColor: "#B3C0A4",
        _hover: {
          bg: "#B3C0A4",
        },
      },
      sizes: {
        md: {
          fontSize: "md",
          px: 6,
          py: 4,
        },
      },
      variants: {
        default: {
          fontSize: "md",
        },
      },
      defaultProps: {
        size: "md",
        variant: "default",
      },
    },
  },
});

export default theme;
