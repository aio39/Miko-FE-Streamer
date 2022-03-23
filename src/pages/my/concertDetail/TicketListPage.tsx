import { Box, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const TicketListPage = () => {
  let { concertId } = useParams();

  // const { data } = useTickets({ per_page: 40, filter: [["concert_id", concertId as string]] });

  return (
    <Box style={{ padding: "1rem 0" }} bgColor="white" width="full" height="full">
      <Text>TicketListPage</Text>
    </Box>
  );
};

export default TicketListPage;
