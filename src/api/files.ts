import { httpClient } from './client';

type UploadFileResponse = {
  description: string;
};

export const uploadFile = (data: FormData) =>
  httpClient.post<UploadFileResponse>(import.meta.env.VITE_ROUTE, data);
