import { Box, Button, Center, Grid, GridItem, Input, Text } from "@chakra-ui/react";
import Screen169 from "@src/components/hoc/Screen169";
import { draftQuizChoicesState, draftQuizState } from "@src/state/recoil/draftQuizState";
import { metadataState } from "@src/state/recoil/metadataState";
import produce from "immer";
import { FC, useMemo } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";

const ChoiceEdit: FC<{ text: string; idx: number }> = ({ text, idx }) => {
  const setDraftQuizChoices = useSetRecoilState(draftQuizChoicesState);
  const handleOnChoiceTextChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    setDraftQuizChoices(prev =>
      produce(prev, draft => {
        draft[idx] = e.target.value;
      }),
    );
  };

  return (
    <Box>
      <Input value={text} onChange={e => handleOnChoiceTextChange(e)}></Input>
    </Box>
  );
};

const Choice: FC<{ text: string; idx: number }> = ({ text, idx }) => {
  const setDraftQuizChoices = useSetRecoilState(draftQuizChoicesState);

  const handleDeleteChoice = () => {
    setDraftQuizChoices(prev =>
      produce(prev, draft => {
        draft.splice(idx, 1);
        return draft;
      }),
    );
  };

  return (
    <GridItem bgColor="white" borderRadius="2xl" p="3" position="relative">
      <Text>{idx + 1}</Text>
      <ChoiceEdit text={text} idx={idx} />
      <Button onClick={handleDeleteChoice} position="absolute" top="-10" right="-10">
        X
      </Button>
    </GridItem>
  );
};

const ChoiceAdd: FC = () => {
  const setDraftQuizChoices = useSetRecoilState(draftQuizChoicesState);
  const handleInitailizeNewChoice = () => {
    setDraftQuizChoices(prev =>
      produce(prev, draft => {
        draft.push("");
        return draft;
      }),
    );
  };

  return (
    <GridItem bgColor="white" borderRadius="2xl" p="3">
      <Center h="full" onClick={handleInitailizeNewChoice}>
        +
      </Center>
    </GridItem>
  );
};

// const ChoiceCreate = () => {
//   return <GridItem bgColor="white" borderRadius="2xl" p="3"></GridItem>;
// };

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

const CreateQuiz = () => {
  const [draftQuizChoices, setDraftQuizChoices] = useRecoilState(draftQuizChoicesState);
  const [draftQuiz, setDraftQuiz] = useRecoilState(draftQuizState);

  const isFull = useMemo(() => draftQuizChoices.length >= 4, [draftQuizChoices]);
  // const isShouldBe3Column = useMemo(() => draftQuiz.s.length >= 5, [draftQuiz]);
  const [width, height] = useMemo(() => {
    const l = draftQuizChoices.length;
    const [w, h] = [25, 35];

    switch (l) {
      case 0:
        return [w, h];
      case 1:
        return [w * 2, h];
      case 2:
        return [w * 2, h * 2];
      case 3:
        return [w * 2, h * 2];
      case 4:
      default:
        return [w * 2, h * 2];
    }
  }, [draftQuizChoices]);

  return (
    <Box overflowY="scroll" h="full">
      <Text>설문 / 퀴즈 제작 </Text>
      <Screen169>
        <Grid templateColumns={`repeat(${width / 25}, 1fr)`} width={width + "%"} height={height + "%"} gap="4" bgColor="gray.400">
          {draftQuizChoices?.map((text, idx) => (
            <Choice key={idx} text={text} idx={idx} />
          ))}
          {!isFull && <ChoiceAdd />}
        </Grid>
      </Screen169>
      <SaveQuizBtn />
    </Box>
  );
};

export default CreateQuiz;
