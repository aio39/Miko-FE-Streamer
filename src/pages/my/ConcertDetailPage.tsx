import { Box, Text } from "@chakra-ui/react";
import { useTickets } from "@src/state/swr/useTickets";
import { useParams } from "react-router-dom";

const ConcertDetailPage = () => {
  let { concertId } = useParams();

  const { data } = useTickets({ per_page: 40, filter: [["concert_id", concertId as string]] });

  if (!data) return <Box>Error</Box>;
  console.log(data);

  return (
    <Box style={{ padding: "1rem 0" }} bgColor="white" width="full" height="full">
      <Text>Concert DetailPage</Text>
    </Box>
  );
};

export default ConcertDetailPage;
