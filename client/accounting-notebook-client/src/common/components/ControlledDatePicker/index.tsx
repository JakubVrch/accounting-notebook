import { TextField, TextFieldProps } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

export function ControlledDatePicker<TFieldValues extends FieldValues>(
  props: UseControllerProps<TFieldValues> & TextFieldProps
) {
  const {
    field: { onChange, value, ref },
  } = useController(props);
  return (
    <DesktopDatePicker
      inputRef={ref}
      label="Date"
      inputFormat="yyyy-MM-dd"
      value={value}
      onChange={onChange}
      renderInput={(params) => (
        <TextField {...params} {...props} variant="standard" />
      )}
    />
  );
}
