import { Box } from "@chakra-ui/react";
import ChatChart from "./ChatChart";
import CurEnterUserChart from "./CurEnterUserChart";
import ScoreAddedChart from "./ScoreAddedChart";
import SuperChatChart from "./SuperChatChart";

const ChartPage = () => {
  return (
    <Box w="full" h="full" overflowY="scroll">
      <ScoreAddedChart />
      <CurEnterUserChart />
      <SuperChatChart />
      <ChatChart />
    </Box>
  );
};

export default ChartPage;
