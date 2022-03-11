import { Box, Input } from "@chakra-ui/react";
import { draftMsgUrlState } from "@src/state/recoil/draftMessageState";
import { useRecoilState } from "recoil";

const LinkInput = () => {
  const [draftMsgUrl, setDraftMsgUrl] = useRecoilState(draftMsgUrlState);

  return (
    <Box>
      <Input placeholder="Url" width="auto" value={draftMsgUrl} onChange={e => setDraftMsgUrl(e.target.value)} />
    </Box>
  );
};

export default LinkInput;
