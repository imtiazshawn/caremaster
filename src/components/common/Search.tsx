import { Search as ISearch } from "@mui/icons-material";
import { SxProps, TextField } from "@mui/material";
import React from "react";

import { COLORS } from "@/shared/constants/colors";

export const Search: React.FC<{
  sx?: SxProps;
  onChange?: (value: string) => void;
  onEnter?: (value: string) => void;
}> = ({ sx, onChange, onEnter }) => {
  const [value, setValue] = React.useState<string>("");

  return (
    <TextField
      placeholder='Search here'
      value={value}
      sx={{
        backgroundColor: COLORS.WHITE,
        borderRadius: 20,
        width: "100%",
        border: "1px solid #E0E0E0",
        flex: 1,
        ...sx,
      }}
      onChange={(e) => {
        onChange?.(e.target.value);
        setValue(e.target.value);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onEnter?.(value);
        }
      }}
      InputProps={{
        endAdornment: (
          <ISearch
            sx={{
              fontSize: "2.2rem",
              color: "rgb(177 177 177 / 87%)",
            }}
          />
        ),
        sx: {
          border: "none",
          outline: "none",
          fieldset: {
            border: "none",
          },
          color: "black",
          height: "100%",
          fontSize: "1.4rem",
        },
      }}
    />
  );
};
