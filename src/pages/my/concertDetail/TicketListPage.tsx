import { Box, Text } from "@chakra-ui/react";
import convertDate from "@src/helper/convertDate";
import { useTickets } from "@src/state/swr/useTickets";
import { Ticket } from "@src/types/share/Ticket";
import { FC } from "react";
import { useParams } from "react-router-dom";

const TicketBox: FC<{ data: Ticket }> = ({ data }) => {
  const { archiveEndTime, concertEndDate, concertStartDate, price, runningTime, saleEndDate, saleStartDate } = data;

  return <Box>{convertDate(archiveEndTime, "YMDHMS")}</Box>;
};

const TicketListPage = () => {
  let { concertId } = useParams();

  const { data } = useTickets({ per_page: 40, filter: [["concert_id", concertId as string]] });

  if (!data) return <Box>no data</Box>;

  const tickets = data.data;

  return (
    <Box style={{ padding: "1rem 0" }} bgColor="white" width="full" height="full">
      <Text>TicketListPage</Text>
      {tickets.map(ticket => (
        <TicketBox key={ticket.id} data={ticket} />
      ))}
    </Box>
  );
};

export default TicketListPage;
