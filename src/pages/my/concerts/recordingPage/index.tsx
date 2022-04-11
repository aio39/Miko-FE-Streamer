import { Box, Heading, useToast } from "@chakra-ui/react";
import { FC } from "react";
import { useParams } from "react-router-dom";

const RecordingPage: FC = () => {
  const { ticketId, concertId } = useParams();
  const toast = useToast();

  return (
    <Box px="6" pt="10" h="full" overflowY="scroll">
      <Heading size="md">レコーディング</Heading>
    </Box>
  );
};

export default RecordingPage;
