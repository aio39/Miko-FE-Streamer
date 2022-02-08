import { useCallback } from 'react';
import SplitPane from 'react-split-pane';
import { useRecoilState } from 'recoil';
import { Message, Quiz } from '../../const';
import { selectedWindowState } from '../../recoil/selectedWindowState';
import CreateMsg from './createMessage/CreateMessage';
import CreateQuiz from './createQuiz/CreateQuiz';
import MetadataListView from './metadataList/MetadataListView';
import SideBar from './sideBar/SideBar';
import TimeLine from './timeline/TimeLine';

const Concert = () => {
  const [selectedWindow, setSelectedWindow] =
    useRecoilState(selectedWindowState);

  const mainWindow = useCallback(() => {
    switch (selectedWindow) {
      case Message:
        return <CreateMsg />;
      case Quiz:
        return <CreateQuiz />;
      default:
        return <h1>No project match</h1>;
    }
  }, [selectedWindow]);

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
        <TimeLine />
      </div>
    </SplitPane>
  );
};

export default Concert;
