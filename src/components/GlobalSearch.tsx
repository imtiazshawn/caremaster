import { Search } from "@mui/icons-material";
import { SxProps, TextField } from "@mui/material";
import React from "react";

import { COLORS } from "@/shared/constants/colors";

export const GlobalSearch: React.FC<{ sx?: SxProps }> = ({ sx }) => {
  return (
    <TextField
      placeholder='Search Here'
      sx={{
        backgroundColor: COLORS.WHITE,
        borderRadius: 20,
        width: "100%",
        border: "1px solid #E0E0E0",
        flex: 1,
        ...sx,
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
          height: "100%",
        },
      }}
    />
  );
};
