import { Box, Input } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { draftMsgUrlState } from 'recoil/draftMessageState';

const LinkInput = () => {
  const [draftMsgUrl, setDraftMsgUrl] = useRecoilState(draftMsgUrlState);

  return (
    <Box>
      <Input
        placeholder="Url"
        width="auto"
        value={draftMsgUrl}
        onChange={(e) => setDraftMsgUrl(e.target.value)}
      />
    </Box>
  );
};

export default LinkInput;
