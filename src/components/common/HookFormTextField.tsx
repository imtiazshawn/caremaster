import { TextFieldProps } from "@mui/material";
import { ChangeEvent, FC, useCallback } from "react";
import {
  Control,
  Controller,
  ControllerRenderProps,
  RegisterOptions,
} from "react-hook-form";

import CustomTextField from "./CustomTextField";

export interface HookFormTextFieldProps extends Omit<TextFieldProps, "name"> {
  name: string;
  labelHint?: string;
  control: Control<any>;
  defaultValue?: string | number;
  rules?: Omit<
    RegisterOptions<any, string>,
    "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
  transform?: (value: string | number) => string | number;
}

const HookFormTextField: FC<HookFormTextFieldProps> = ({
  name,
  control,
  type,
  fullWidth,
  defaultValue,
  rules,
  transform,
  variant,
  ...rest
}) => {
  const handleChanage = useCallback(
    (field: ControllerRenderProps) =>
      (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.value;
        const transformedValue = transform?.(value) ?? value;
        if (type === "number" && transformedValue !== "") {
          field.onChange(Number(transformedValue));
        } else {
          field.onChange(transformedValue);
        }
      },
    [transform, type],
  );

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <CustomTextField
          fullWidth={fullWidth}
          type={type}
          error={Boolean(error?.message)}
          helperText={error?.message}
          variant={variant}
          {...field}
          onChange={handleChanage(field)}
          {...rest}
          value={field.value ?? ""}
        />
      )}
    />
  );
};

export default HookFormTextField;
