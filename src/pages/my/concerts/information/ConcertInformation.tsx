import { Box, Button } from "@chakra-ui/react";
import { NODE_URL } from "@src/const";
import { axiosI } from "@src/state/swr/fetcher";
import { useConcert } from "@src/state/swr/useConcert";
import { Concert } from "@src/types/share/Concert";
import { FC } from "react";
import { useParams } from "react-router-dom";

const ConcertInformation: FC = () => {
  const params = useParams();
  const { data: concertData } = useConcert(parseInt(params.concertId as string));

  if (!concertData) return <Box>No Data</Box>;

  const getKeyHandler = async () => {
    const { data } = await axiosI.post<Concert>("/ivs", { name: concertData?.data.id }, { baseURL: NODE_URL });
    console.log("create channel", data);
  };

  return (
    <Box>
      <Button onClick={getKeyHandler}>Get Key</Button>
    </Box>
  );
};

export default ConcertInformation;
