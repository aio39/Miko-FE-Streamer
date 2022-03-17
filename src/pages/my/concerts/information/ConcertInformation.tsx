import { Box, Button, Text } from "@chakra-ui/react";
import { NODE_URL } from "@src/const";
import { axiosI } from "@src/state/swr/fetcher";
import { useConcert } from "@src/state/swr/useConcert";
import { Concert } from "@src/types/share/Concert";
import { FC } from "react";
import { useParams } from "react-router-dom";

const ConcertInformation: FC = () => {
  const params = useParams();
  const { data: concertData, mutate } = useConcert(parseInt(params.concertId as string));

  if (!concertData) return <Box>No Data</Box>;

  const {
    allConcertEndDate,
    allConcertStartDate,
    artist,
    categoryId,
    channelArn,
    content,
    coverImage,
    createdAt,
    detail,
    id,
    isPublic,
    ingestEndpoint,
    playbackUrl,
    streamKeyArn,
    streamKeyValue,
    title,
    updatedAt,
  } = concertData.data;

  const getKeyHandler = async () => {
    const { data } = await axiosI.post<Concert>("/ivs", { name: concertData?.data.id }, { baseURL: NODE_URL, withCredentials: true });
    mutate();
    console.log("create channel", data);
  };

  return (
    <Box>
      <Text>{title}</Text>
      <Text>{detail}</Text>
      <Text>streamKeyArn: {streamKeyArn}</Text>
      <Text>channelArn: {channelArn}</Text>
      <Text>playbackUrl: {playbackUrl}</Text>
      <Text>streamKeyValue: {streamKeyValue}</Text>
      <Text>ingestEndpoint: {ingestEndpoint}</Text>
      {!streamKeyArn && <Button onClick={getKeyHandler}>Get Key</Button>}
    </Box>
  );
};

export default ConcertInformation;
