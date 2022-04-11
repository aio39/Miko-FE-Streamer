import { Box, Heading, Text, useToast, VStack } from "@chakra-ui/react";
import AsyncBoundary from "@src/components/common/wrapper/AsyncBoundary";
import { calculateLastThumbnail, generateIvsThumbUrl } from "@src/helper";
import convertDate from "@src/helper/convertDate";
import { usePageLaravel } from "@src/state/swr/useLaravel";
import { FC } from "react";
import { useParams } from "react-router-dom";

const RecordingList = () => {
  const { ticketId, concertId } = useParams();

  const { data } = usePageLaravel("/recordings", { filter: [["ticket_id", ticketId as string]] });
  console.log(data);

  if (!data?.data) {
    return <Box>no data</Box>;
  }

  return (
    <VStack>
      {data.data.map(recording => {
        const { id, prefix, start, end, stream_id } = recording;
        return (
          <Box idx={stream_id}>
            <Text>{prefix}</Text>
            <Text>{convertDate(start, "YMDHMS")}</Text>
            <Text>{convertDate(end, "YMDHMS")}</Text>
            <Text>{prefix}</Text>
            {start && end && <Text> {calculateLastThumbnail(start, end)} </Text>}
            <img src={generateIvsThumbUrl(prefix, 0)} alt="thumb" />
          </Box>
        );
      })}
    </VStack>
  );
};

const RecordingPage: FC = () => {
  const toast = useToast();

  return (
    <Box px="6" pt="10" h="full" overflowY="scroll">
      <Heading size="md">レコーディング</Heading>
      <AsyncBoundary>
        <RecordingList />
      </AsyncBoundary>
    </Box>
  );
};

export default RecordingPage;
