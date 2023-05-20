import { useSearchParams } from "react-router-dom";

export const useQueryString = () => {
  const [searchQueryParams] = useSearchParams();
  const searchQueryParamsObj = Object.fromEntries([...searchQueryParams]);
  return searchQueryParamsObj;
};
