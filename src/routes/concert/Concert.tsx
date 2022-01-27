import { VStack } from '@chakra-ui/react';
import SplitPane from 'react-split-pane';

const Concert = () => {
  return (
    <SplitPane defaultSize="80%" split="horizontal" style={{ height: '100vh' }}>
      <SplitPane defaultSize="10%" split="vertical">
        <div className="full_wh" style={{ backgroundColor: 'green' }}>
          <VStack width="full" height="full" bgColor="gray.100">
            aaaa
          </VStack>
        </div>
        <SplitPane defaultSize="70%" split="vertical">
          <div className="full_wh"> 1aaa</div>
          <div className="full_wh"> bbbb</div>
        </SplitPane>
      </SplitPane>
      <div>mediaLine</div>
    </SplitPane>
  );
};

export default Concert;
