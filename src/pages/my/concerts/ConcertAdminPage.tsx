import { Center } from "@chakra-ui/react";
import { GetChannel, Information, Message, Quiz, Sell } from "@src/const";
import { metadataState } from "@src/state/recoil/metadataState";
import { selectedWindowState } from "@src/state/recoil/selectedWindowState";
import { useTicket } from "@src/state/swr/useTickets";
import { Suspense, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import SplitPane from "react-split-pane";
import { useRecoilState, useSetRecoilState } from "recoil";
import AddSocketEventLayer from "./AddSocketEventLayer";
import CreateMsg from "./createMessage/CreateMessage";
import CreateQuiz from "./createQuiz/CreateQuiz";
import ConcertInformation from "./information/ConcertInformation";
import ManageKeys from "./manageKeys/ManageKeys";
import MetadataListView from "./metadataList/MetadataListView";
import SellHistory from "./sellHistory/SellHistory";
import SideBar from "./sideBar/SideBar";

const SuspenseHOC = (WrappedComponent: () => JSX.Element) => {
  return function () {
    return (
      <Suspense fallback={<Center> 로딩</Center>}>
        <WrappedComponent />
      </Suspense>
    );
  };
};

const ConcertAdminPageNoData = () => {
  const [selectedWindow, setSelectedWindow] = useRecoilState(selectedWindowState);
  const setMetadataList = useSetRecoilState(metadataState);
  const { ticketId } = useParams();
  const { data: ticketData } = useTicket(+(ticketId as string));

  useEffect(() => {
    if (ticketData?.data.timeMetaData) {
      setMetadataList(ticketData.data.timeMetaData);
    }

    return () => {};
  }, [ticketData?.data]);

  const mainWindow = useCallback(() => {
    switch (selectedWindow) {
      case Message:
        return <CreateMsg />;
      case Quiz:
        return <CreateQuiz />;
      case Information:
        return <ConcertInformation />;
      case GetChannel:
        return <ManageKeys />;
      case Sell:
        return <SellHistory />;
      default:
        return <h1>No project match</h1>;
    }
  }, [selectedWindow]);

  return (
    <AddSocketEventLayer>
      <SplitPane defaultSize="99%" split="horizontal" style={{ height: "100vh" }}>
        <SplitPane defaultSize="3%" split="vertical">
          <div className="full_wh" style={{ border: "2px", borderBlockColor: "white" }}>
            <SideBar></SideBar>
            {/* <VStack width="full" height="full" bgColor="gray.100">
            aaaaaaaaaafsdfdssdf
          </VStack> */}
          </div>
          <SplitPane defaultSize="80%" split="vertical">
            <div className="full_wh">{mainWindow()}</div>
            <div className="full_wh ">
              <MetadataListView></MetadataListView>
            </div>
          </SplitPane>
        </SplitPane>
        <div className="full_wh" style={{ backgroundColor: "#39c5bb33" }}>
          {/* <TimeLine /> */}
        </div>
      </SplitPane>
    </AddSocketEventLayer>
  );
};

const ConcertAdminPage = SuspenseHOC(ConcertAdminPageNoData);

export default ConcertAdminPage;
