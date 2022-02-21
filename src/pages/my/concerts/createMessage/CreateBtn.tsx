import { Button } from '@chakra-ui/react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { draftMsgState } from 'recoil/draftMessageState';
import { metadataState } from 'recoil/metadataState';

const CreateBtn = () => {
  const draftMessage = useRecoilValue(draftMsgState);
  const [metadata, setMetadata] = useRecoilState(metadataState);

  const handleSaveMessage = () => {
    setMetadata((prev) => [
      ...prev,
      { createdAt: Date.now(), data: draftMessage, type: 'm' },
    ]);
  };

  return (
    <Button colorScheme="blue" onClick={handleSaveMessage}>
      Save
    </Button>
  );
};

export default CreateBtn;
