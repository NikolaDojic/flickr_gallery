import { apiKey, baseUrl, flickrMethods } from "./config";

const imageFormats = "url_m,url_o";
export const fetchImages = (
  queryParams?: Record<string, string | number> | undefined
) => {
  const url = new URL(baseUrl);
  url.searchParams.append("api_key", apiKey);
  url.searchParams.append("extras", imageFormats);
  url.searchParams.append("method", flickrMethods.getRecent);
  url.searchParams.append("format", "json");
  url.searchParams.append("nojsoncallback", "1");
  queryParams &&
    Object.keys(queryParams).forEach((key) =>
      url.searchParams.append(key, String(queryParams[key]))
    );
  return fetch(url).then((response) => response.json());
};

export const objToQueryParams = (obj: Record<string, string | number>) =>
  Object.keys(obj)
    .map((key) => `${key}=${String(obj[key])}`)
    .join("&");
