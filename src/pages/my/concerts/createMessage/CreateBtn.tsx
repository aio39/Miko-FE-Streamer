import { Button } from "@chakra-ui/react";
import { draftMsgState } from "@src/state/recoil/draftMessageState";
import { metadataState } from "@src/state/recoil/metadataState";
import { useRecoilState, useRecoilValue } from "recoil";

const CreateBtn = () => {
  const draftMessage = useRecoilValue(draftMsgState);
  const [metadata, setMetadata] = useRecoilState(metadataState);

  const handleSaveMessage = () => {
    setMetadata(prev => [...prev, { createdAt: Date.now(), data: draftMessage, type: "m" }]);
  };

  return (
    <Button colorScheme="blue" onClick={handleSaveMessage}>
      Save
    </Button>
  );
};

export default CreateBtn;
