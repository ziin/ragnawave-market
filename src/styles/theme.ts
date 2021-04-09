import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  fonts: {
    heading: "Raleway",
    body: "Roboto",
  },
  colors: {
    facebook: {
      "100": "#F9FAFC",
    },
  },
  styles: {
    global: {
      "html, body": {
        bgColor: "gray.100",
      },
    },
  },
  components: {
    Table: {
      baseStyle: {
        th: {
          textTransform: "none",
          letterSpacing: "1px",
        },
      },
    },
    Button: {
      baseStyle: {
        _focus: {
          boxShadow: "",
        },
      },
    },
  },
});
