import { Box, Text } from "@chakra-ui/react";
import { useConcert } from "@src/state/swr/useConcert";
import { useParams } from "react-router-dom";

const ConcertDetailPage = () => {
  let { concertId } = useParams();

  const { data: concertData } = useConcert(parseInt(concertId as string));
  if (!concertData) return <Box>Error</Box>;

  return (
    <Box bgColor="white" width="full" height="full">
      <Text>Concert DetailPage</Text>
      <Text>{concertData.data.title}</Text>
      <Text>{concertData.data.artist}</Text>
      <Text>{concertData.data.categoryId}</Text>
      <Text>{concertData.data.content}</Text>
      <Text>{concertData.data.coverImage}</Text>
      <Text>{concertData.data.createdAt}</Text>
      <Text>{concertData.data.detail}</Text>
      <Text>{concertData.data.id}</Text>
      <Text>{concertData.data.isPublic}</Text>
      {/* <Text>{concertData.data.user}</Text> */}
    </Box>
  );
};

export default ConcertDetailPage;
