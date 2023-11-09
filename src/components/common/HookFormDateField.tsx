import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { FC, useCallback, useState } from "react";
import { Control, useController } from "react-hook-form";

import TextField, { TextFieldProps } from "./TextField";

export interface HookFormDateFieldProps extends Omit<TextFieldProps, "name"> {
  name: string;
  labelHint?: string;
  control: Control<any>;
  inputFormat?: string;
  disableFuture?: boolean;
}

const HookFormDateField: FC<HookFormDateFieldProps> = ({
  name,
  control,
  label,
  fullWidth,
  defaultValue,
  disableFuture = false,
  inputFormat = "DD MMMM, YYYY",
  disabled = false,
  variant,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
    defaultValue: defaultValue ?? rest.value ?? null,
  });

  const handleDateChange = useCallback(
    (date: Dayjs | null) => {
      if (date?.isValid()) {
        field.onChange(date.toDate());
      } else {
        field.onChange(undefined);
      }
    },
    [field],
  );

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  field.value = rest.value ?? field.value;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        open={isOpen}
        disabled={disabled}
        disableMaskedInput
        disableFuture={disableFuture}
        label={label}
        value={field.value}
        inputFormat={inputFormat}
        onOpen={toggleOpen}
        onClose={toggleOpen}
        onChange={handleDateChange}
        renderInput={(params: any) => (
          <TextField
            name={name}
            variant={variant}
            {...params}
            {...rest}
            fullWidth={fullWidth}
            error={Boolean(error?.message)}
            helperText={error?.message}
            onClick={toggleOpen}
            autoComplete='off'
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: "4px",
              },
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default HookFormDateField;
