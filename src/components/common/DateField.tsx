import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { FC, useCallback, useState } from "react";

import TextField, { TextFieldProps } from "./TextField";

export interface DateFieldProps
  extends Omit<TextFieldProps, "name" | "onChange"> {
  labelHint?: string;
  inputFormat?: string;
  disableFuture?: boolean;
  onChange?: (date: Dayjs | undefined) => void;
}

const DateField: FC<DateFieldProps> = ({
  label,
  fullWidth,
  value,
  disableFuture = false,
  inputFormat = "DD MMMM, YYYY",
  disabled = false,
  variant,
  onChange,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  const handleDateChange = useCallback(
    (date: Dayjs | null) => {
      if (date?.isValid()) {
        onChange?.(date);
      } else {
        onChange?.(undefined);
      }
      setIsOpen(false);
    },
    [onChange],
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        open={isOpen}
        disabled={disabled}
        disableMaskedInput
        disableFuture={disableFuture}
        label={label}
        value={value}
        inputFormat={inputFormat}
        // onOpen={toggleOpen}
        // onClose={toggleOpen}
        onChange={handleDateChange}
        renderInput={(params: any) => (
          <TextField
            name={name}
            variant={variant}
            {...params}
            {...rest}
            fullWidth={fullWidth}
            // error={Boolean(error?.message)}
            // helperText={error?.message}
            onClick={toggleOpen}
            autoComplete='off'
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default DateField;
