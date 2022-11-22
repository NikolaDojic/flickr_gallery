import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Image } from "./Image";

describe("Image component", () => {
  const MOCK_PROPS = {
    id: "1",
    owner: "1234",
    ownername: "fake_name",
    title: "fake title 1",
    url_m: "https://fake_img1_m.jpg/",
    url_o: "https://fake_img1_o.jpg/",
  };

  it("Shoud render an image", () => {
    render(<Image {...MOCK_PROPS} />);
    const imageEl = screen.getByRole("img");
    // @ts-ignore
    expect(imageEl.src).toBe(MOCK_PROPS.url_m);
    // @ts-ignore
    expect(imageEl.alt).toBe(MOCK_PROPS.title);
  });
  it("Should render a owner name and title", async () => {
    render(<Image {...MOCK_PROPS} />);
    const titleEl = screen.getByText(MOCK_PROPS.title);
    expect(titleEl).toBeInTheDocument();
    expect(titleEl).not.toBeVisible();
    const ownernameEl = screen.getByText(MOCK_PROPS.title);
    expect(ownernameEl).toBeInTheDocument();
    expect(ownernameEl).not.toBeVisible();
  });
  it("should call open window on click", async () => {
    render(<Image {...MOCK_PROPS} />);
    const titleEl = screen.getByText(MOCK_PROPS.title);
    // @ts-ignore
    const countBefore = window.open.mock.calls.length;
    await act(() => fireEvent.click(titleEl));
    // @ts-ignore
    const countAfter = window.open.mock.calls.length;

    expect(countAfter).toBe(countBefore + 1);
    expect(window.open).toHaveBeenCalledWith(MOCK_PROPS.url_o, "_blank");
  });
  it("should fall back to url_m if there is no url_o on click", async () => {
    render(<Image {...{ ...MOCK_PROPS, url_o: "" }} />);
    const titleEl = screen.getByText(MOCK_PROPS.title);
    await act(() => fireEvent.click(titleEl));
    expect(window.open).toHaveBeenCalledWith(MOCK_PROPS.url_m, "_blank");
  });
  it("Should fall back to owner name if there is no title", () => {
    render(<Image {...{ ...MOCK_PROPS, title: "" }} />);
    const titleTextEl = screen.getByTestId("img-title");
    expect(titleTextEl).toHaveTextContent(MOCK_PROPS.ownername);
  });
});
