import { Box, Input } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { draftMessageState } from '../../../recoil/draftMessageState';

const LinkInput = () => {
  const [draftMessage, setDraftMessage] = useRecoilState(draftMessageState);

  return (
    <Box>
      <Input
        placeholder="Url"
        width="auto"
        value={draftMessage.u}
        onChange={(e) =>
          setDraftMessage((pre) => ({ ...pre, u: e.target.value }))
        }
      />
    </Box>
  );
};

export default LinkInput;
