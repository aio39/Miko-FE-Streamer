import { CommonFSW, Pagination } from "@src/types/share/common/common";
import useSWR from "swr";
import { createFSWQueryString } from "./createQueryStringKey";
import { fetcher } from "./fetcher";
import laggy from "./middleware/laggy";

const useData = <T>(url: string, query?: CommonFSW) => {
  query && (url += "?" + createFSWQueryString(query));

  const swrResponses = useSWR<Pagination<T>>(query ? url : null, fetcher, {
    use: [laggy],
    suspense: true,
  });

  return swrResponses;
};

export { useData };
