import { Center } from '@chakra-ui/react';
import { GetChannel, Information, Message, Quiz } from 'const';
import { Suspense, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import SplitPane from 'react-split-pane';
import { useRecoilState } from 'recoil';
import { selectedWindowState } from 'state/recoil/selectedWindowState';
import { useConcert } from 'state/swr/useConcert';
import CreateMsg from './createMessage/CreateMessage';
import CreateQuiz from './createQuiz/CreateQuiz';
import ConcertInformation from './information/ConcertInformation';
import ManageKeys from './manageKeys/ManageKeys';
import MetadataListView from './metadataList/MetadataListView';
import SideBar from './sideBar/SideBar';

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
  const [selectedWindow, setSelectedWindow] =
    useRecoilState(selectedWindowState);
  const params = useParams();
  const { data } = useConcert(parseInt(params.concertId as string));
  console.log('data', data?.data);
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
      default:
        return <h1>No project match</h1>;
    }
  }, [selectedWindow]);

  console.log(params);

  return (
    <SplitPane defaultSize="80%" split="horizontal" style={{ height: '100vh' }}>
      <SplitPane defaultSize="3%" split="vertical">
        <div className="full_wh" style={{ backgroundColor: '#ff000022' }}>
          <SideBar></SideBar>
          {/* <VStack width="full" height="full" bgColor="gray.100">
            aaaaaaaaaafsdfdssdf
          </VStack> */}
        </div>
        <SplitPane defaultSize="70%" split="vertical">
          <div className="full_wh">{mainWindow()}</div>
          <div className="full_wh">
            <MetadataListView></MetadataListView>
          </div>
        </SplitPane>
      </SplitPane>
      <div className="full_wh" style={{ backgroundColor: '#39c5bb33' }}>
        {/* <TimeLine /> */}
      </div>
    </SplitPane>
  );
};

const ConcertAdminPage = SuspenseHOC(ConcertAdminPageNoData);

export default ConcertAdminPage;
