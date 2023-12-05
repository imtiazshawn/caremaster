import { Radio, RadioGroup } from "@common/Radio";
import { H5 } from "@common/Typography";
import { FlexBox } from "@common/index";
import {
  FormControlLabel,
  FormControlLabelProps,
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
  options: { label: string; value: string | boolean }[];
}

export const HookFormRadioGroup: FC<HookFormRadioProps> = ({
  name,
  control,
  label,
  labelPlacement = "top",
  defaultValue,
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
      <Controller
        name={name}
        defaultValue={defaultValue}
        control={control}
        render={({ field }) => {
          return (
            <FormControlLabel
              sx={{
                alignItems: "flex-start",
              }}
              label={label}
              labelPlacement={labelPlacement}
              control={
                <RadioGroup
                  aria-labelledby='demo-radio-buttons-group-label'
                  // defaultValue='Never'cd
                  {...field}
                  value={field.value}
                  sx={{
                    flexDirection: labelPosition === "left" ? "row" : "column",
                    gap: 0,
                  }}
                >
                  {options.map((option, index) => (
                    <FlexBox
                      key={index}
                      sx={{
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Radio
                        name={field.name}
                        value={option.value}
                        checked={
                          field.value?.toString() === option.value.toString()
                        }
                      />
                      <H5>{option.label}</H5>
                    </FlexBox>
                  ))}
                </RadioGroup>
              }
              {...rest}
              {...field}
              value={field.value}
            />
          );
        }}
      />
      {/* {options.map((option, index) => (
      ))} */}
    </FlexBox>
  );
};

export default HookFormRadioGroup;
