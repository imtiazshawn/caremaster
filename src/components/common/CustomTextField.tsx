import { TextField, TextFieldProps } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  "& .MuiInputLabel-root": {
    position: "relative",
    transform: "none",
    marginBottom: "0.5rem",
    color: theme.palette.text.primary,
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

CustomTextField.defaultProps = {
  InputLabelProps: { shrink: true },
};

export default CustomTextField;
