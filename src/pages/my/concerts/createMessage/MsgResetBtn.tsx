import { Button } from "@chakra-ui/react";

const MsgResetBtn = () => {
  // const resetDraftMessage = useResetRecoilState(draftMsgState);

  const handleReset = () => {
    // resetDraftMessage();
  };

  return <Button onClick={handleReset}>Reset</Button>;
};

export default MsgResetBtn;
