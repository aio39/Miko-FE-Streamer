import { Box, BoxProps, Button, Heading, useToast } from "@chakra-ui/react";
import useSocket from "@src/state/hooks/useSocket";
import { useCoinHistories } from "@src/state/swr/useCoinHistory";
import { useTicket } from "@src/state/swr/useTickets";
import { motion } from "framer-motion";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Rank = {
  score: number;
  value: string;
};

function shuffle(array: any[]) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return [...array];
}

const MotionBox = motion<Omit<BoxProps, "transition">>(Box);
const PER_PAGE = 50;

const RankingPage: FC = () => {
  const { ticketId, concertId } = useParams();
  const socket = useSocket();
  const toast = useToast();
  const { data: ticketData, mutate } = useTicket(parseInt(ticketId as string));
  const [ranks, setRanks] = useState<Rank[]>([]);
  const [start, setStart] = useState(0);

  const { data } = useCoinHistories({
    filter: [
      ["ticket_id", ticketId as string],
      ["type", 5],
    ],
  });

  useEffect(() => {
    const getRank = (newRanks: Rank[]) => {
      setRanks(newRanks);
    };
    socket.on("be-all-rank", getRank);
    return () => {};
  }, [socket]);

  useEffect(() => {
    const requestNewRanks = () => {
      socket.emit("fe-all-rank", ticketId, start, start + PER_PAGE);
    };

    const intervalId = setInterval(requestNewRanks, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [socket]);

  return (
    <Box px="6" pt="10">
      <Heading size="md">ランキング</Heading>
      <Button disabled={start === 0} onClick={() => setStart(prev => prev + PER_PAGE)}>
        Before 50{" "}
      </Button>
      <Button disabled={ranks.length < PER_PAGE} onClick={() => setStart(prev => prev + PER_PAGE)}>
        Next 50
      </Button>
      <Button
        onClick={() => {
          setRanks(prev => shuffle(prev));
        }}
      >
        test - shuffle
      </Button>
      {ranks.map(({ score, value }, idx) => {
        return (
          <MotionBox key={value + score} layoutId={value} borderBottom="2px" borderColor="blackAlpha.300" w="300px" m="2" px="2" py="2">
            {idx + 1 + start}: {value}- {score}
          </MotionBox>
        );
      })}
    </Box>
  );
};

export default RankingPage;
