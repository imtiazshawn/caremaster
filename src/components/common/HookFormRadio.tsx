import { H5 } from "@common/Typography";
import { FlexBox } from "@common/index";
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
  labelPosition?: "left" | "top";
  options: string[];
}

export const HookFormRadio: FC<HookFormRadioProps> = ({
  name,
  control,
  label,
  labelPlacement = "end",
  defaultValue,
  radioProps,
  labelPosition,
  options,
  ...rest
}) => {
  return (
    <FlexBox
      sx={{
        flexDirection: labelPosition === "left" ? "row" : "column",
        gap: 0,
      }}
    >
      <H5 sx={{ mb: 1 }}>{label}</H5>
      {options.map((option) => (
        <Controller
          key={option}
          name={name}
          defaultValue={defaultValue}
          control={control}
          render={({ field }) => (
            <FormControlLabel
              label={option}
              labelPlacement={labelPlacement}
              control={
                <Radio
                  size='small'
                  value={option}
                  checked={field.value === option}
                  {...radioProps}
                />
              }
              {...rest}
              {...field}
              value={field.value}
            />
          )}
        />
      ))}
    </FlexBox>
  );
};

export default HookFormRadio;
