import { Box, Button, Flex, Heading, Tag, Text, Tooltip, useClipboard } from "@chakra-ui/react";
import { NEST_URL } from "@src/const";
import { axiosI } from "@src/state/swr/fetcher";
import { useTicket } from "@src/state/swr/useTickets";
import { Concert } from "@src/types/share/Concert";
import { FC } from "react";
import { BiCopyAlt } from "react-icons/bi";
import { useParams } from "react-router-dom";
import ScoreAddedChart from "../chart/ScoreAddedChart";

const KeyView: FC<{ keyName: string; tipText: string; keyValue: string }> = ({ keyName, tipText, keyValue }) => {
  const { hasCopied, onCopy } = useClipboard(keyValue, 1500);

  return (
    <Heading display="flex" w="full" size="md" py="2" onClick={onCopy} cursor="pointer" whiteSpace="nowrap">
      <Tooltip hasArrow bg="#39c5bb" label={tipText}>
        <Tag flexShrink="0">{keyName}</Tag>
      </Tooltip>
      :
      <Text isTruncated flexShrink="1">
        {keyValue}
      </Text>
      <Box flexShrink="0" as="span" display="inline">
        <BiCopyAlt color={hasCopied ? "black" : "red"} />
      </Box>
    </Heading>
  );
};

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
    <Box px="6" pt="10">
      {channelArn && (
        <Flex direction="column">
          <Heading size="lg" py="3">
            Key
          </Heading>
          <Box border="2px" borderColor="ActiveBorder">
            <KeyView keyName={"streamKeyValue"} keyValue={streamKeyValue} tipText="" />
            <KeyView keyName={"ingestEndpoint"} keyValue={ingestEndpoint} tipText="" />
          </Box>
          <KeyView keyName={"playbackUrl"} keyValue={playbackUrl} tipText="" />
          <KeyView keyName={"streamKeyArn"} keyValue={streamKeyArn} tipText="" />
          <KeyView keyName={"channelArn"} keyValue={channelArn} tipText="" />
        </Flex>
      )}
      {!channelArn && <Button onClick={getKeyHandler}>Get Key</Button>}
      <ScoreAddedChart />
    </Box>
  );
};

export default ConcertInformation;
