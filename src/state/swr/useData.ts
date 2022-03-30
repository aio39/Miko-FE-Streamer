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
    refreshInterval: 1000 * 60, // CRON JOB으로 하는게 최선이긴한데
  });

  return swrResponses;
};

export { useData };
