import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1E6069",
      dark: "#082F3C",
      light: "#349572",
      contrastText: "#fff",
    },
    secondary: {
      main: "#F4F4F4",
      dark: "#082F00",
      contrastText: "#000",
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

export const COLOR = {
  redText: "#F16363",
  yellowText: "#FC9736",
};
