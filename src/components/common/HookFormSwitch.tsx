import {
  FormControlLabel,
  FormControlLabelProps,
  Switch,
  SwitchProps,
} from "@mui/material";
import { FC } from "react";
import { Control, Controller } from "react-hook-form";

export interface HookFormSwitchProps
  extends Omit<FormControlLabelProps, "control"> {
  name: string;
  control: Control<any>;
  switchColor?: SwitchProps["color"];
  size?: SwitchProps["size"];
}

const HookFormSwitch: FC<HookFormSwitchProps> = ({
  name,
  control,
  label,
  labelPlacement = "start",
  defaultChecked = false,
  switchColor,
  size,
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
            <Switch
              size={size ?? "small"}
              color={switchColor ?? "primary"}
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

export default HookFormSwitch;
