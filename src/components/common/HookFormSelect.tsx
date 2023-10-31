import { SelectChangeEvent, SelectProps } from "@mui/material";
import { FC, useCallback } from "react";
import { Control, Controller, ControllerRenderProps } from "react-hook-form";

import Select, { SelectOption } from "./Select";

export interface HookFormSelectProps
  extends Omit<SelectProps, "name" | "variant"> {
  name: string;
  control: Control<any>;
  defaultValue?: string | number | string[] | number[];
  labelHint?: string;
  options?: SelectOption[];
  variant?: "standard" | "outlined" | "filled" | undefined;
}

const HookFormSelect: FC<HookFormSelectProps> = ({
  name,
  control,
  type,
  defaultValue,
  variant,
  ...rest
}) => {
  const handleChanage = useCallback(
    (field: ControllerRenderProps) => (e: SelectChangeEvent<unknown>) => {
      if (type === "number" && e.target.value !== "") {
        field.onChange(Number(e.target.value));
      } else {
        field.onChange(e.target.value);
      }
    },
    [type],
  );

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <Select
          type={type}
          {...field}
          error={Boolean(error?.message)}
          helperText={error?.message}
          onChange={handleChanage(field)}
          {...rest}
          value={field.value ?? ""}
          variant={variant}
        />
      )}
    />
  );
};

export default HookFormSelect;
