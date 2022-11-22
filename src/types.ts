export type TPhoto = {
  id: string;
  owner: string;
  ownername: string;
  title: string;
  url_m: string;
  url_o: string;
};

export type TPhotos = {
  page: number;
  pages: number;
  perpage: number;
  photo: TPhoto[];
  total: string;
};

export type TPhotosResponse = {
  photos: TPhotos;
  stat: string;
};

export type TFetchHookReturn<T> = {
  data: T | null;
  error: Error | null;
  loading: boolean;
};
