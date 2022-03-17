import useSocket from "@src/state/hooks/useSocket";
import { useConcert } from "@src/state/swr/useConcert";
import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";

const AddSocketEventLayer: FC = ({ children }) => {
  const socket = useSocket();
  const params = useParams();
  const { data: concertData } = useConcert(parseInt(params.concertId as string));
  useEffect(() => {
    if (!socket || !concertData) return;

    socket.emit("fe-st-join-concert-room", concertData.data.id);

    return () => {};
  }, [socket, concertData]);

  return <>{children}</>;
};

export default AddSocketEventLayer;
