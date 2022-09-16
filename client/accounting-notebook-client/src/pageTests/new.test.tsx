import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import New from "pages/new";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

describe("New", () => {
  it("renders header fields", () => {
    render(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <New />
      </LocalizationProvider>
    );

    expect(screen.getByRole("textbox", { name: "Date" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Note" })).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: "Account" })
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Amount" })).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: "Line note" })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  it("can submit form", async () => {
    const user = userEvent.setup({ skipClick: true });
    console.log = jest.fn();

    render(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <New />
      </LocalizationProvider>
    );

    await userEvent.clear(screen.getByRole("textbox", { name: "Date" }));

    await userEvent.type(
      screen.getByRole("textbox", { name: "Date" }),
      "2022-05-12"
    );
    await userEvent.type(
      screen.getByRole("textbox", { name: "Note" }),
      "Test Text 123"
    );
    await userEvent.type(
      screen.getByRole("textbox", { name: "Account" }),
      "Test Text 123"
    );
    await userEvent.type(
      screen.getByRole("textbox", { name: "Amount" }),
      "123,00"
    );
    await userEvent.type(
      screen.getByRole("textbox", { name: "Line note" }),
      "Test Text 123"
    );

    expect(screen.getByRole("textbox", { name: "Date" })).toHaveValue(
      "2022-05-12"
    );

    await user.click(screen.getByRole("button", { name: "Submit" }));

    //TODO: finich unit test: check if console logs form object
    expect(console.log).toHaveBeenCalledWith({
      account: "Test Text 123",
      amount: "123,00",
      date: new Date("2022-05-12"),
      note: "Test Text 123",
      "note-line": "Test Text 123",
    });
  });
});
