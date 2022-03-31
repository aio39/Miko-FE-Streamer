import { Box, Heading, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useToast } from "@chakra-ui/react";
import { chType } from "@src/const";
import convertDate from "@src/helper/convertDate";
import { useCoinHistories } from "@src/state/swr/useCoinHistory";
import { useTicket } from "@src/state/swr/useTickets";
import { useMyCoin } from "@src/state/swr/useUser";
import { FC } from "react";
import { useParams } from "react-router-dom";

const SellHistory: FC = () => {
  const { ticketId, concertId } = useParams();
  const toast = useToast();
  const { data: ticketData, mutate } = useTicket(parseInt(ticketId as string));
  const { data: coinData } = useMyCoin();
  const { data } = useCoinHistories({
    filter: [
      ["ticket_id", ticketId as string],
      ["type", 5],
    ],
  });

  return (
    <Box px="6" pt="10">
      <Heading size="md">販売履歴</Heading>
      <Heading> coin : {coinData?.data || "NO COIN"}</Heading>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>日にち</Th>
              <Th>User ID</Th>
              <Th>金額</Th>
              <Th isNumeric>タイプ</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data &&
              data.data.map(history => {
                const { type, userId, variation, createdAt } = history;
                return (
                  <Tr key={createdAt}>
                    <Td>{convertDate(createdAt, "YMDHMS")}</Td>
                    <Td>{userId}</Td>
                    <Td>{variation}</Td>
                    <Td isNumeric>{chType[type]}</Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SellHistory;
