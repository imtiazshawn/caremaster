import {
  Checkbox,
  FormControlLabel,
  FormControlLabelProps,
} from "@mui/material";
import { FC } from "react";
import { Control, Controller } from "react-hook-form";

export interface HookFormSwitchProps
  extends Omit<FormControlLabelProps, "control"> {
  name: string;
  control: Control<any>;
}

const HookFormCheckbox: FC<HookFormSwitchProps> = ({
  name,
  control,
  label,
  labelPlacement = "start",
  defaultChecked = false,
  sx,
  ...rest
}) => {
  return (
    <Controller
      name={name}
      defaultValue={defaultChecked}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          label={label}
          labelPlacement={labelPlacement}
          control={
            <Checkbox
              size='small'
              checked={field.value}
            />
          }
          sx={{
            ml: 0,
            justifyContent: "space-between",
            "& .MuiFormControlLabel-label": {
              fontWeight: 600,
              color: field.value ? "inherit" : "text.disabled",
            },
            ...sx,
          }}
          {...rest}
          {...field}
          value={field.value}
        />
      )}
    />
  );
};

export default HookFormCheckbox;
