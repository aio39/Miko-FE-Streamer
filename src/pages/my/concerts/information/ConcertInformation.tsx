import { Box, Button, Text } from "@chakra-ui/react";
import { NEST_URL } from "@src/const";
import { axiosI } from "@src/state/swr/fetcher";
import { useTicket } from "@src/state/swr/useTickets";
import { Concert } from "@src/types/share/Concert";
import { FC } from "react";
import { useParams } from "react-router-dom";
import ScoreAddedChart from "../chart/ScoreAddedChart";

const ConcertInformation: FC = () => {
  const { ticketId } = useParams();

  const { data: ticketData, mutate } = useTicket(parseInt(ticketId as string));

  if (!ticketData) return <Box>No Data</Box>;

  const getKeyHandler = async () => {
    const { data } = await axiosI.post<Concert>("/ivs", { name: ticketData?.data.id }, { baseURL: NEST_URL, withCredentials: true });
    mutate();
    console.log("create channel", data);
  };

  const { streamKeyValue, streamKeyArn, channelArn, playbackUrl, ingestEndpoint } = ticketData.data;

  return (
    <Box>
      <Text>streamKeyArn: {streamKeyArn}</Text>
      <Text>channelArn: {channelArn}</Text>
      <Text>playbackUrl: {playbackUrl}</Text>
      <Text>streamKeyValue: {streamKeyValue}</Text>
      <Text>ingestEndpoint: {ingestEndpoint}</Text>
      {!streamKeyArn && <Button onClick={getKeyHandler}>Get Key</Button>}
      <ScoreAddedChart />
    </Box>
  );
};

export default ConcertInformation;
