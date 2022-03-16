import { Button } from "@chakra-ui/react";
import { draftQuizState } from "@src/state/recoil/draftQuizState";
import { metadataState } from "@src/state/recoil/metadataState";
import produce from "immer";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";

const SaveQuizBtn = () => {
  const draftQuiz = useRecoilValue(draftQuizState);
  const [metadata, setMetadata] = useRecoilState(metadataState);
  const resetDraftQuiz = useResetRecoilState(draftQuizState);

  const handleSaveQuiz = () => {
    // setMetadata(prev => [...prev, { createdAt: Date.now(), data: draftQuiz, type: "q" }]);
    setMetadata(prev =>
      produce(prev, draft => {
        if (draftQuiz.createdAt !== -1) {
          // Edit으로 불러온 데이터
          const idx = draft.findIndex(v => v.createdAt === draftQuiz.createdAt);
          draft[idx] = draftQuiz;
        } else {
          draft.push({ ...draftQuiz, createdAt: Date.now() });
        }
      }),
    );
    resetDraftQuiz();
  };

  return <Button onClick={handleSaveQuiz}>Save</Button>;
};

export default SaveQuizBtn;
