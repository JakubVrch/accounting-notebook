import { render, screen } from "@testing-library/react";
import Home from "pages/index";

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        name: /Welcome to Next\.js!/i,
      })
    ).toBeInTheDocument();
  });
});
