import { CoinHistory } from "@src/types/share/CoinHistory";
import { CommonFSW, Pagination } from "@src/types/share/common/common";
import useSWR from "swr";
import { createFSWQueryString } from "./createQueryStringKey";
import { fetcher } from "./fetcher";
import laggy from "./middleware/laggy";

const URL_COIN_HISTORY = "/coin_histories";

const useCoinHistories = (query?: CommonFSW) => {
  let url = URL_COIN_HISTORY + "?";
  query && (url += createFSWQueryString(query));

  const swrResponses = useSWR<Pagination<CoinHistory>>(query ? url : null, fetcher, {
    use: [laggy],
    suspense: true,
  });

  return swrResponses;
};

export { useCoinHistories };
