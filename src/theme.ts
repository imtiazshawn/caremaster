import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1E6069",
      dark: "#082F3C",
      light: "#1F6D6B",
      contrastText: "#fff",
    },
    secondary: {
      main: "#1F6D6B",
      dark: "#082F00",
      contrastText: "#fff",
    },
    text: {
      primary: "#082F00",
      secondary: "#858D9D",
    },
  },
  typography: {
    fontFamily: "Plus Jakarta Sans, sans-serif",
  },
});
