export type TPhoto = {
  id: string;
  owner: string;
  title: string;
  url_m: string;
  url_o: string;
  ownername: string;
};

export type TPhotos = {
  page: number;
  pages: number;
  perpage: number;
  total: string;
  photo: TPhoto[];
};

export type TPhotosResponse = {
  photos: TPhotos;
  stat: string;
};

export type TFetchHookReturn<T> = {
  loading: boolean;
  error: Error | null;
  data: T | null;
};
