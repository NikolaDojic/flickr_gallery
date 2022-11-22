import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { FAVOURITES, useFavourites } from "./useFavourites";

describe("test useFavourites hook", () => {
  const initialFavourites = ["a", "b", "c"];
  beforeEach(() => {
    // @ts-ignore
    window.localStorage.setItem(FAVOURITES, initialFavourites);
  });
  it("Should get initial favourites", () => {
    const { result } = renderHook(() => useFavourites());
    const [favourites] = result.current;
    expect(favourites.sort()).toEqual(initialFavourites.sort());
  });
  it("Should get the same values as in local storage", () => {
    const { result } = renderHook(() => useFavourites());
    const [favourites] = result.current;
    expect(favourites.sort()).toEqual(
      JSON.parse(window.localStorage.getItem(FAVOURITES) || "").sort()
    );
  });
  it("Should remove value from favourites", () => {
    const toggleValue = "a";
    const { result } = renderHook(() => useFavourites());
    const [favourites, toggleFavourite] = result.current;
    expect(favourites).toContain(toggleValue);
    act(() => {
      toggleFavourite(toggleValue);
    });
    expect(
      JSON.parse(window.localStorage.getItem(FAVOURITES) || "")
    ).not.toContain(toggleValue);
  });
  it("Should add value to favourites", () => {
    const toggleValue = "d";
    const { result } = renderHook(() => useFavourites());
    const [favourites, toggleFavourite] = result.current;
    expect(favourites).not.toContain(toggleValue);
    act(() => {
      toggleFavourite(toggleValue);
    });
    expect(JSON.parse(window.localStorage.getItem(FAVOURITES) || "")).toContain(
      toggleValue
    );
  });
  it("Should return an empty array if no favourites are set", () => {
    window.localStorage.setItem(FAVOURITES, "");
    const { result } = renderHook(() => useFavourites());
    const [favourites] = result.current;
    expect(favourites).toEqual([]);
  });
});
