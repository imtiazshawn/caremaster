import {
  FormControlLabel,
  FormControlLabelProps,
  Radio,
  RadioProps,
} from "@mui/material";
import { FC } from "react";
import { Control, Controller } from "react-hook-form";

export interface HookFormRadioProps
  extends Omit<FormControlLabelProps, "control"> {
  name: string;
  control: Control<any>;
  radioProps?: RadioProps;
}

export const HookFormRadio: FC<HookFormRadioProps> = ({
  name,
  control,
  label,
  labelPlacement = "end",
  defaultValue,
  radioProps,
  value,
  ...rest
}) => {
  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          label={label}
          labelPlacement={labelPlacement}
          control={
            <Radio
              size='small'
              value={value}
              checked={field.value === value}
              {...radioProps}
            />
          }
          {...rest}
          {...field}
          value={field.value}
        />
      )}
    />
  );
};

export default HookFormRadio;
