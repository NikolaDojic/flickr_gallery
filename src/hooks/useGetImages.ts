import { useEffect, useState } from "react";
import { apiKey, baseUrl, flickrMethods } from "../config";
import { TFetchHookReturn, TPhotosResponse } from "../types";

type TGetImagesParams = {
  page?: number | string;
  per_page?: number | string;
};

export const useGetImages = (
  queryParams?: TGetImagesParams
): TFetchHookReturn<TPhotosResponse> => {
  const [data, setData] = useState(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await fetchImages(queryParams);
        setData(response);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    })();
  }, [queryParams?.per_page, queryParams?.page]);

  return { data, error, loading };
};

const imageFormats = "url_m,url_o,owner_name";
const fetchImages = async (queryParams?: TGetImagesParams) => {
  const url = new URL(baseUrl);
  url.searchParams.append("api_key", apiKey);
  url.searchParams.append("extras", imageFormats);
  url.searchParams.append("method", flickrMethods.getRecent);
  url.searchParams.append("format", "json");
  url.searchParams.append("nojsoncallback", "1");
  queryParams &&
    Object.keys(queryParams).forEach((key) =>
      url.searchParams.append(
        key,
        String(queryParams[key as keyof TGetImagesParams])
      )
    );
  return (await fetch(url)).json();
};
