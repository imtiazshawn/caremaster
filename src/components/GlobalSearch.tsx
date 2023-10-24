import { Search } from "@mui/icons-material";
import { TextField } from "@mui/material";

import { COLORS } from "@/shared/constants/colors";

export const GlobalSearch = () => {
  return (
    <TextField
      placeholder='Search'
      sx={{
        backgroundColor: COLORS.WHITE,
        borderRadius: 20,
        width: "100%",
        flex: 1,
      }}
      InputProps={{
        startAdornment: (
          <Search sx={{ mr: "10px", color: "rgb(177 177 177 / 87%)" }} />
        ),
        sx: {
          border: "none",
          outline: "none",
          fieldset: {
            border: "none",
          },
          color: "black",
        },
      }}
    />
  );
};
