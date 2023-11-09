import { H5 } from "@common/Typography";
import { FlexBox } from "@common/index";
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
  labelPosition?: "left" | "top";
  options: string[];
}

const HookFormMultiCheckbox: FC<HookFormSwitchProps> = ({
  name,
  control,
  label,
  labelPlacement = "end",
  defaultChecked = false,
  sx,
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
      {options.map((_field, index) => (
        <Controller
          key={_field}
          name={`${name}.${index}`}
          defaultValue={defaultChecked}
          control={control}
          render={({ field }) => {
            return (
              <FormControlLabel
                label={options[index]}
                labelPlacement={labelPlacement}
                control={
                  <Checkbox
                    size='small'
                    checked={field.value}
                    onChange={(e) => field.onChange(e)}
                  />
                }
                sx={{
                  ml: 0,
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
            );
          }}
        />
      ))}
    </FlexBox>
  );
};

export default HookFormMultiCheckbox;
