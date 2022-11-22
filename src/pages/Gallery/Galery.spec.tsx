import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { mockFetch, MOCK_PHOTO } from "../../hooks/useGetImages.spec";
import { Gallery } from "./Gallery";

describe("test Gallery", () => {
  beforeEach(() => {
    // @ts-ignore
    global.fetch = jest.fn(mockFetch);
  });
  afterEach(() => {});

  it("renders Gallery page", async () => {
    await act(() => render(<Gallery />));
    const galleryPageEl = screen.queryByTestId("gallery-page");
    expect(galleryPageEl).toBeInTheDocument();
  });

  it("should render images", async () => {
    await act(() => render(<Gallery />));
    const imgCount = screen.getAllByRole("img").length;
    expect(imgCount).toBe(MOCK_PHOTO.length);
  });

  it("should render error", async () => {
    await act(() => {
      // @ts-ignore
      global.fetch = async () => {
        throw new Error("test error");
      };
      render(<Gallery />);
    });
    const errorEl = screen.getByText("test error");
    expect(errorEl).toBeInTheDocument();
  });
  it("should call setState on scroll", async () => {
    await act(() => render(<Gallery />));
    const imagesWrapper = screen.getByTestId("images-wrapper");
    // @ts-ignore
    const callsBefore = fetch.mock.calls.length;
    await act(() =>
      fireEvent.scroll(imagesWrapper, { target: { scrollY: 100000 } })
    );
    // @ts-ignore
    const callsAfter = fetch.mock.calls.length;
    expect(callsBefore).toBe(callsAfter - 1);
  });
});
