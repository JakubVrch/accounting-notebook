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
    expect(screen.getAllByRole("textbox", { name: "Account" })).toHaveLength(2);
    expect(screen.getAllByRole("textbox", { name: "Amount" })).toHaveLength(2);
    expect(screen.getAllByRole("textbox", { name: "Line note" })).toHaveLength(
      2
    );
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
      screen.getAllByRole("textbox", { name: "Account" })[0],
      "Test Text 123"
    );
    await userEvent.type(
      screen.getAllByRole("textbox", { name: "Amount" })[0],
      "123,00"
    );
    await userEvent.type(
      screen.getAllByRole("textbox", { name: "Line note" })[0],
      "Test Text 123"
    );

    expect(screen.getByRole("textbox", { name: "Date" })).toHaveValue(
      "2022-05-12"
    );

    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(console.log).toHaveBeenCalledWith({
      entries: [
        {
          value: "123,00",
          account: "Test Text 123",
          note: "Test Text 123",
        },
        {
          value: "",
          account: "",
          note: "",
        },
      ],
      date: new Date("2022-05-12"),
      note: "Test Text 123",
    });
  });
});
