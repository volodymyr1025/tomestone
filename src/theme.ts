import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0071dc",
      light: "#3394ff",
      dark: "#004ba3",
    },
    secondary: {
      main: "#dc0071",
      light: "#f50096",
      dark: "#94004b",
    },
    warning: {
      main: "#FA9D26",
    },
    text: {
      primary: "#556e85",
    },
  },
  typography: {
    fontFamily: `"Finlandica", sans-serif`,
    body1: {
      fontSize: "18px",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          minWidth: "120px",
        },
      },
    },
  },
});

export default theme;
