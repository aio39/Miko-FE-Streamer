import { useCallback } from 'react';
import SplitPane from 'react-split-pane';
import { useRecoilState } from 'recoil';
import { Message, Quiz } from '../../const';
import { selectedWindowState } from '../../recoil/selectedWindowState';
import SideBar from './sideBar/SideBar';


const MessageCreate = () => {
  return <div>
    message careate
  </div>
}

const QuizCreate = () => {
  return <div>
    quiz
  </div>
}

const Concert = () => {

    const [selectedWindow, setSelectedWindow] = useRecoilState(selectedWindowState);

   const mainWindow = useCallback(() => {
       switch(selectedWindow) {
        case Message:   return <MessageCreate />;
        case Quiz:   return <QuizCreate />;
        default:      return <h1>No project match</h1>
      }
    }, [selectedWindow]);
    

  return (
    <SplitPane defaultSize="80%" split="horizontal" style={{ height: '100vh' }}>
      <SplitPane defaultSize="10%" split="vertical">
        <div className="full_wh" style={{ backgroundColor: 'green' }}>
          <SideBar></SideBar>
          {/* <VStack width="full" height="full" bgColor="gray.100">
            aaaaaaaaaafsdfdssdf
          </VStack> */}
        </div>
        <SplitPane defaultSize="70%" split="vertical">
          <div className="full_wh">{
            mainWindow()
          }</div>
          <div className="full_wh"> bbbb</div>
        </SplitPane>
      </SplitPane>
      <div>mediaLine</div>
    </SplitPane>
  );
};

export default Concert;
