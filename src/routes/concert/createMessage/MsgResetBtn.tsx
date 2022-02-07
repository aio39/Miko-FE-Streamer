import { Button } from '@chakra-ui/react';
import { useResetRecoilState } from 'recoil';
import { draftMessageState } from '../../../recoil/draftMessageState';

const MsgResetBtn = () => {
  const resetDraftMessage = useResetRecoilState(draftMessageState);

  const handleReset = () => {
    resetDraftMessage();
  };

  return <Button onClick={handleReset}>Reset</Button>;
};

export default MsgResetBtn;
