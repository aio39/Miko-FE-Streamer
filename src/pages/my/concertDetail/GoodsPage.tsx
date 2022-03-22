import { Box, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const GoodsPage = () => {
  let { concertId } = useParams();

  return (
    <Box style={{ padding: "1rem 0" }} bgColor="white" width="full" height="full">
      <Text>Goods Page</Text>
    </Box>
  );
};

export default GoodsPage;
