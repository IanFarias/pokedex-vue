import { useAxios } from "./useAxios";

export const useHttp = (baseURL, headers) => {
  const axiosInstance = useAxios(baseURL, headers);
  const responseBody = (response) => response.data;

  const get = (endpoint) => axiosInstance.get(endpoint).then(responseBody);

  return { get };
};
