import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { FormValues, TransactionForm } from "..";

const setup = (onSubmit: Parameters<typeof TransactionForm>[0]["onSubmit"]) => {
  const form = render(
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <TransactionForm onSubmit={onSubmit} />
    </LocalizationProvider>
  );
  return {
    dateField: form.getByRole("textbox", { name: "Date *" }),
    noteField: form.getByRole("textbox", { name: "Note *" }),
    accountFields: form.getAllByRole("textbox", { name: "Account *" }),
    amountFields: form.getAllByRole("textbox", { name: "Amount *" }),
    lineNoteFields: form.getAllByRole("textbox", { name: "Line note" }),
    submitButton: form.getByRole("button", { name: "Submit" }),
    ...form,
  };
};

describe("TransactionForm", () => {
  it("renders fields", () => {
    const form = setup(() => null);
    expect(form.dateField).toBeInTheDocument();
    expect(form.noteField).toBeInTheDocument();
    expect(form.accountFields).toHaveLength(2);
    expect(form.amountFields).toHaveLength(2);
    expect(form.lineNoteFields).toHaveLength(2);
    expect(form.submitButton).toBeInTheDocument();
  });

  it("can submit form", async () => {
    const { clear, click, type } = userEvent.setup();
    const onSubmit = jest.fn();
    const form = setup(onSubmit);

    await clear(form.dateField);
    await type(form.dateField, "2022-05-12");
    await type(form.noteField, "Test Text 123");
    await type(form.accountFields[0], "Test Text 123");
    await type(form.amountFields[0], "123,53");
    await type(form.lineNoteFields[0], "Test Text 123");
    await type(form.accountFields[1], "Test Text 456");
    await type(form.amountFields[1], "89");

    await click(form.submitButton);
    expect(onSubmit).toBeCalledWith(
      {
        entries: [
          {
            value: "123,53",
            account: "Test Text 123",
            note: "Test Text 123",
          },
          {
            value: "89",
            account: "Test Text 456",
            note: "",
          },
        ],
        date: new Date("2022-05-12"),
        note: "Test Text 123",
      },
      expect.anything()
    );
  });
  //TOOD: write test for required errors
  it.todo("provides error for required fields");
});
