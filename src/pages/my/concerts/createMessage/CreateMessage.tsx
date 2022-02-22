import { Box, HStack } from '@chakra-ui/react';
import Screen169 from 'components/hoc/Screen169';
import {
  draftMsgMainTextState,
  draftMsgSubTextState,
} from 'state/recoil/draftMessageState';
import CreateBtn from './CreateBtn';
import DraftMessagePreview from './DraftMessagePreview';
import DragTest from './DragTest';
import LinkInput from './LinkInput';
import MsgBoxEditor from './MsgBoxEditor';
import MsgResetBtn from './MsgResetBtn';
import MsgTextDataEditor from './MsgTextDataEditor';
import { PositionSelector } from './PositionSelector';

const CreateMsg = () => {
  return (
    <Box overflowY="scroll" h="full">
      <Box>
        <Screen169>
          <DraftMessagePreview />
        </Screen169>
      </Box>
      <HStack flexWrap="wrap">
        <PositionSelector />
        <MsgBoxEditor />
        <MsgTextDataEditor atom={draftMsgMainTextState} type="main" />
        <MsgTextDataEditor atom={draftMsgSubTextState} type="sub" />
      </HStack>

      <LinkInput />
      <CreateBtn />
      <MsgResetBtn></MsgResetBtn>
      <DragTest />
    </Box>
  );
};

export default CreateMsg;
