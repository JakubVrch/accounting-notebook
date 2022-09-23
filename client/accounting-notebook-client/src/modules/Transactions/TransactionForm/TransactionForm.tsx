import { useForm, useFieldArray } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ControlledDatePicker } from "common/components/ControlledDatePicker";

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
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ControlledDatePicker<FormValues>
        name="date"
        required
        control={control}
        rules={{ required: true }}
      />
      <br />
      <TextField
        label="Note"
        multiline
        required
        variant="standard"
        {...register("note", { required: true })}
      />

      {fields.map((field, index) => (
        <div key={field.id}>
          <hr />
          <TextField
            label="Account"
            variant="standard"
            required
            {...register(`entries.${index}.account`, { required: true })}
          />
          <TextField
            label="Line note"
            multiline
            variant="standard"
            {...register(`entries.${index}.note`)}
          />
          <TextField
            label="Amount"
            variant="standard"
            required
            {...register(`entries.${index}.value`, { required: true })}
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
