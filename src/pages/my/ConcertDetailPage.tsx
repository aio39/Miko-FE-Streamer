import { Box, Text } from "@chakra-ui/react";
import { useLocation, useSearchParams } from "react-router-dom";

const ConcertDetailPage = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  let location = useLocation();
  return (
    <Box style={{ padding: "1rem 0" }} bgColor="blue" width="full" height="full">
      <Text>Concert DetailPage</Text>
    </Box>
  );
};

export default ConcertDetailPage;
