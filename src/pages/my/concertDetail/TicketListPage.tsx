import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import AsLink from "@src/components/common/wrapChakra/AsLink";
import convertDate from "@src/helper/convertDate";
import { useTickets } from "@src/state/swr/useTickets";
import { Ticket } from "@src/types/share/Ticket";
import { FC } from "react";
import { BiLinkExternal } from "react-icons/bi";
import { useParams } from "react-router-dom";

const TicketBox: FC<{ data: Ticket }> = ({ data }) => {
  const { archiveEndTime, concertEndDate, concertStartDate, price, runningTime, saleEndDate, saleStartDate, concertId, id } = data;

  return (
    <Box
      w="sm"
      // mx="auto"
      bg={useColorModeValue("white", "gray.800")}
      shadow="md"
      rounded="lg"
      overflow="hidden"
    >
      <Box py={4} px={6}>
        <Text> {price} </Text>
        <Text> {runningTime} </Text>
        <Text> {convertDate(archiveEndTime)} </Text>
        <Text> {convertDate(concertEndDate)} </Text>
        <Text> {convertDate(concertStartDate)} </Text>
        <Text> {convertDate(saleEndDate)} </Text>
        <Text> {convertDate(saleStartDate)} </Text>
      </Box>
      <Box>
        <AsLink to={`/my/concerts/${concertId}/admin/${id}`}>
          <BiLinkExternal />
        </AsLink>
      </Box>
    </Box>
  );
};

const TicketCardList: FC = () => {
  let { concertId } = useParams();

  const { data } = useTickets({ per_page: 40, filter: [["concert_id", concertId as string]] });

  if (!data) return <Box>no data</Box>;

  const tickets = data.data;

  return (
    <Flex flexWrap="wrap" w="full" flexDirection="row" alignItems="center" justifyContent="center" gap="20px">
      {tickets.map(ticket => (
        <TicketBox key={ticket.id} data={ticket} />
      ))}
    </Flex>
  );
};

const TicketListPage = () => {
  return (
    <Box style={{ padding: "1rem 0" }} bgColor="white" width="full" height="full">
      <Text>TicketListPage</Text>
      <TicketCardList />
    </Box>
  );
};

export default TicketListPage;
