import axios, { AxiosError } from "axios";
import { useSearchParams } from "react-router-dom";

export const useQueryString = () => {
  const [searchQueryParams] = useSearchParams();
  const searchQueryParamsObj = Object.fromEntries([...searchQueryParams]);
  return searchQueryParamsObj;
};

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error);
}
