import useSocket from "@src/state/hooks/useSocket";
import { useTicket } from "@src/state/swr/useTickets";
import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";

const AddSocketEventLayer: FC = ({ children }) => {
  const socket = useSocket();
  const { ticketId } = useParams();

  const { data: ticketData } = useTicket(parseInt(ticketId as string));

  useEffect(() => {
    if (!socket || !ticketData) return;

    socket.emit("fe-st-join-concert-room", ticketData.data.id);

    return () => {};
  }, [socket, ticketData]);

  return <>{children}</>;
};

export default AddSocketEventLayer;
