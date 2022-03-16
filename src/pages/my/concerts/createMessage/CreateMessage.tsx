import { Box, HStack } from "@chakra-ui/react";
import SaveMetaDataBtn from "@src/components/button/SaveQuizBtn";
import Screen169 from "@src/components/hoc/Screen169";
import { draftMsgMainTextState, draftMsgState, draftMsgSubTextState } from "@src/state/recoil/draftMessageState";
import { useRecoilValue } from "recoil";
import DraftMessagePreview from "./DraftMessagePreview";
import DragTest from "./DragTest";
import LinkInput from "./LinkInput";
import MsgBoxEditor from "./MsgBoxEditor";
import MsgResetBtn from "./MsgResetBtn";
import MsgTextDataEditor from "./MsgTextDataEditor";
import { PositionSelector } from "./PositionSelector";

const SaveBtn = () => {
  const msgMetaData = useRecoilValue(draftMsgState);

  return <SaveMetaDataBtn savedMetaData={msgMetaData} />;
};

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
      <MsgResetBtn></MsgResetBtn>
      <DragTest />
      <SaveBtn />
    </Box>
  );
};

export default CreateMsg;
