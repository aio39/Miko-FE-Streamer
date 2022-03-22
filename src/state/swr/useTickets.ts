import { CommonDataResponse, CommonFSW, Pagination } from "@src/types/share/common/common";
import { Ticket } from "@src/types/share/Ticket";
import useSWR from "swr";
import { createFSWQueryString } from "./createQueryStringKey";
import { fetcher } from "./fetcher";
import laggy from "./middleware/laggy";

const URL_TICKETS = "/tickets";

const useTickets = (query?: CommonFSW) => {
  let url = URL_TICKETS + "?";
  query && (url += createFSWQueryString(query));

  const swrResponses = useSWR<Pagination<Ticket>>(query ? url : null, fetcher, {
    use: [laggy],
    suspense: true,
  });

  return swrResponses;
};

const useTicket = (ticketId: number) => {
  const url = `${URL_TICKETS}/${ticketId}`;

  const swrResponses = useSWR<CommonDataResponse<Ticket>>(url, fetcher, {
    use: [laggy],
    suspense: true,
  });

  return swrResponses;
};

export { useTickets, useTicket };
