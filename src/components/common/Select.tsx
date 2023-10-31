import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as MSelect,
  SelectProps as MSelectProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { FC } from "react";

const StyledSelect = styled(MSelect)<MSelectProps>(({ theme }) => ({
  "& .MuiInputLabel-root": {
    position: "relative",
    transform: "none",
    marginBottom: "0.5rem",
    fontWeight: "500",
    color: theme.palette.text.primary,
    borderRadius: "12px",
    height: "56px",
  },
  "& .MuiInputBase-root": {
    borderRadius: "12px",
    height: "56px",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: theme.palette.primary.main,
  },
  "& .MuiInputBase-root.MuiAutocomplete-inputRoot": {
    padding: "5px 9px",
  },
  "& .MuiInputBase-input": {
    padding: "12.5px 14px",
  },
  "& .MuiInputBase-inputMultiline": {
    padding: 0,
  },
  "& .MuiInputBase-multiline": {
    padding: "12.5px 14px",
  },
  "& .MuiOutlinedInput-notchedOutline legend": {
    width: 0,
  },
}));

type ValuedOption = {
  label: string;
  value: string | number;
};

export type SelectOption = string | ValuedOption;

export interface SelectProps extends MSelectProps {
  helperText?: string;
  options?: SelectOption[];
}
const Select: FC<SelectProps> = ({
  fullWidth,
  label,
  error,
  helperText,
  sx,
  options,
  children,
  ...rest
}) => (
  <FormControl
    fullWidth={fullWidth}
    sx={sx}
  >
    {label && (
      <InputLabel
        shrink={true}
        sx={{
          position: "relative",
          transform: "none",
          marginBottom: "0.5rem",
          fontWeight: "500",
          color: "text.primary",
        }}
      >
        {label}
      </InputLabel>
    )}
    <StyledSelect
      fullWidth={fullWidth}
      error={error}
      {...rest}
    >
      {children ??
        options?.map((option) => {
          if (typeof option === "string") {
            return (
              <MenuItem
                key={option}
                value={option}
              >
                {option}
              </MenuItem>
            );
          }
          return (
            <MenuItem
              key={option.value}
              value={option.value}
            >
              {option.label}
            </MenuItem>
          );
        })}
    </StyledSelect>
    {error && <FormHelperText error={error}>{helperText}</FormHelperText>}
  </FormControl>
);

export default Select;
