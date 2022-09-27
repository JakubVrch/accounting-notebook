import { useForm, useFieldArray } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ControlledDatePicker } from "common/components/ControlledDatePicker";
import { useEffect } from "react";

export type FormValues = {
  date: Date;
  entries: {
    account: string;
    note: string;
    value: string;
  }[];
  note: string;
};

//TODO: Refactor to compnents
//TODO: Validations a error display
//TODO: i18n
export function TransactionForm({
  onSubmit,
}: {
  onSubmit: { (data: FormValues): unknown };
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      date: new Date(),
      entries: [{}, {}],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "entries",
    rules: { minLength: 2 },
  });
  useEffect(() => console.log(errors));
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <hr />
      <ControlledDatePicker<FormValues>
        label="Date *"
        name="date"
        control={control}
        error={!!errors.date}
        helperText={errors.date ? errors.date.message : null}
        rules={{ required: "Date is required" }}
      />
      <br />
      <TextField
        label="Note *"
        multiline
        variant="standard"
        error={!!errors.note}
        helperText={errors.note ? errors.note.message : null}
        {...register("note", { required: "Note is required" })}
      />

      {fields.map((field, index) => (
        <div key={field.id}>
          <hr />
          <TextField
            label="Account *"
            variant="standard"
            error={!!errors.entries?.[index]?.account}
            helperText={
              errors.entries?.[index]?.account
                ? errors.entries?.[index]?.account?.message
                : null
            }
            {...register(`entries.${index}.account`, {
              required: "Account is required",
            })}
          />
          <TextField
            label="Line note"
            multiline
            variant="standard"
            {...register(`entries.${index}.note`)}
          />
          <TextField
            label="Amount *"
            variant="standard"
            error={!!errors.entries?.[index]?.value}
            helperText={
              errors.entries?.[index]?.value
                ? errors.entries?.[index]?.value?.message
                : null
            }
            {...register(`entries.${index}.value`, {
              required: "Amount is required",
            })}
          />
          <Button variant="outlined" onClick={() => remove(index)}>
            Delete line
          </Button>
        </div>
      ))}

      <Button type="submit" variant="outlined">
        Submit
      </Button>
      <Button
        variant="outlined"
        onClick={() => {
          append({} as FormValues["entries"][0]);
        }}
      >
        New line
      </Button>
    </form>
  );
}
