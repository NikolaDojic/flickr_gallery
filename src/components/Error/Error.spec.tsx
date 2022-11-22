import { render, screen } from "@testing-library/react";
import { Error } from "./Error";

describe("Error component", () => {
  it("Should render the error message", () => {
    const testMessage = "Test Error Messsage";
    render(<Error message={testMessage} />);
    const errorEl = screen.getByText(testMessage);
    expect(errorEl).toBeInTheDocument();
  });
  it("Should not render error component", async () => {
    const testMessage = null;
    const { container } = render(<Error message={testMessage} />);
    expect(container).toBeEmptyDOMElement();
  });
});
