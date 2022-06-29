import { TransactionTable } from ".";
import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import { mockTransactions } from "common/APISpec";

describe(" Transaction Table", () => {
  it("renders data", () => {
    render(<TransactionTable transactions={mockTransactions} />);
    expect(screen.getAllByRole("cell", { name: "Text 2" })).toHaveLength(1);
  });

  it("is able to expand", () => {
    render(<TransactionTable transactions={mockTransactions} />);
    expect(
      screen.queryAllByRole("rowheader", { name: "Liabilities" })
    ).toHaveLength(0);
    fireEvent.click(screen.getAllByRole("button", { name: "expand row" })[0]);
    expect(
      screen.queryAllByRole("rowheader", { name: "Liabilities" })
    ).toHaveLength(1);
  });
});
