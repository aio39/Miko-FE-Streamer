import { CommonDataResponse, CommonFSW, Pagination } from "@src/types/share/common/common";
import { Product } from "@src/types/share/Product";
import useSWR from "swr";
import { createFSWQueryString } from "./createQueryStringKey";
import { fetcher } from "./fetcher";
import laggy from "./middleware/laggy";

const URL_PRODUCTS = "/products";

export const useProducts = (query?: CommonFSW) => {
  let url = URL_PRODUCTS + "?";
  query && (url += createFSWQueryString(query));

  const swrResponses = useSWR<Pagination<Product>>(query ? url : null, fetcher, {
    use: [laggy],
  });

  return swrResponses;
};

export const useProduct = (id: number) => {
  const url = `${URL_PRODUCTS}/${id}`;

  const swrResponses = useSWR<CommonDataResponse<Product>>(url, fetcher, {
    use: [laggy],
    suspense: true,
  });

  return swrResponses;
};
