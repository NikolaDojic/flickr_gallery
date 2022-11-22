import { renderHook, waitFor } from "@testing-library/react";
import { useGetImages } from "./useGetImages";

export const MOCK_PHOTO = Array(100)
  .fill(0)
  .map((number, index) => ({
    id: `${index}`,
    owner: `owner${index}`,
    ownername: `fake_name ${index}`,
    title: `fake title ${index}`,
    url_m: `https://fake_img${index}_m.jpg`,
    url_o: `https://fake_img${index}_o.jpg`,
  }));

export const mockFetch = (_url: string) => {
  const { searchParams } = new URL(_url);
  const page = Number(searchParams.get("page") || 1);
  const per_page = Number(searchParams.get("per_page") || 100);
  return Promise.resolve({
    json: () =>
      Promise.resolve({
        stat: "ok",
        photos: {
          page: page || 1,
          photo: MOCK_PHOTO,
          perpage: per_page || 100,
          total: 999,
          pages: 999 / per_page,
        },
      }),
  });
};

describe("test useGetImages hook", () => {
  beforeEach(() => {
    // @ts-ignore
    global.fetch = jest.fn(mockFetch);
  });

  it("Should fetch photos", async () => {
    const { result } = renderHook(() => useGetImages());
    await waitFor(() => expect(result.current.data).toBeTruthy());
    const { loading, data, error } = result.current;
    expect(loading).toBe(false);
    expect(error).toBe(null);
    expect(data?.photos.photo).toEqual(MOCK_PHOTO);
  });

  it("Should pass per_page", async () => {
    const { result } = renderHook(() => useGetImages({ per_page: 70 }));
    await waitFor(() => expect(result.current.data).toBeTruthy());
    const { loading, data, error } = result.current;
    expect(loading).toBe(false);
    expect(error).toBe(null);
    expect(data?.photos.perpage).toEqual(70);
  });

  it("Should pass page", async () => {
    const { result } = renderHook(() => useGetImages({ page: 7 }));
    await waitFor(() => expect(result.current.data).toBeTruthy());
    const { loading, data, error } = result.current;
    expect(loading).toBe(false);
    expect(error).toBe(null);
    expect(data?.photos.page).toEqual(7);
  });

  it("Should have an error", async () => {
    global.fetch = () => {
      throw new Error("test error");
    };
    const { result } = renderHook(() => useGetImages({ page: 7 }));
    await waitFor(() => expect(result.current.error).toBeTruthy());
    const { loading, data, error } = result.current;
    expect(loading).toBe(false);
    expect(data).toBe(null);
    expect(error?.message).toBe("test error");
  });
});
