import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { FAVOURITES } from "../../hooks/useFavourites";
import { FavouriteButton } from "./FavouriteButton";
describe("Favourite Button", () => {
  beforeAll(() => {
    window.localStorage.setItem(FAVOURITES, JSON.stringify(["testId"]));
  });
  it("Should render favourite button", () => {
    render(<FavouriteButton imageId={"123"} />);
    const favouriteButtonEl = screen.getByText("Favourite");
    expect(favouriteButtonEl).toBeInTheDocument();
  });
  it("Should show heart if imageId is in favourites", () => {
    render(<FavouriteButton imageId={"testId"} />);
    const favouriteButtonEl = screen.getByText("♥");
    expect(favouriteButtonEl).toBeInTheDocument();
  });
  it("Should toggle favourite", async () => {
    const imageId = "123";
    render(<FavouriteButton imageId={imageId} />);
    const favouriteButtonEl = screen.getByText("Favourite");
    const favourites = JSON.parse(
      window.localStorage.getItem(FAVOURITES) || "[]"
    );
    expect(favourites).not.toContain(imageId);
    await act(() => fireEvent.click(favouriteButtonEl));
    const favouritesNew = JSON.parse(
      window.localStorage.getItem(FAVOURITES) || "[]"
    );
    expect(favouritesNew).toContain(imageId);
  });
});
