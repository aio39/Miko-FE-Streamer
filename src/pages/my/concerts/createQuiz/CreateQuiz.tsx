import { Box, Button, Center, Grid, GridItem, Text } from '@chakra-ui/react';
import Screen169 from 'components/hoc/Screen169';
import produce from 'immer';
import { FC, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { draftQuizState } from 'state/recoil/draftQuizState';
import { metadataState } from 'state/recoil/metadataState';

const Choice: FC<{ text: string; idx: number }> = ({ text, idx }) => {
  const [draftQuiz, setDraftQuiz] = useRecoilState(draftQuizState);

  const ChoiceEdit: FC<{ text: string }> = ({ text: aText }) => {
    return <Box>{text}</Box>;
  };

  const handleDeleteChoice = () => {
    setDraftQuiz((prev) =>
      produce(prev, (draft) => {
        draft.choices.splice(idx, 1);
        return draft;
      })
    );
  };

  return (
    <GridItem bgColor="white" borderRadius="2xl" p="3" position="relative">
      <Text>{idx + 1}</Text>
      <ChoiceEdit text={text} />
      <Button
        onClick={handleDeleteChoice}
        position="absolute"
        top="-10"
        right="-10"
      >
        X
      </Button>
    </GridItem>
  );
};

const ChoiceAdd: FC = () => {
  const [draftQuiz, setDraftQuiz] = useRecoilState(draftQuizState);
  const handleInitailizeNewChoice = () => {
    setDraftQuiz((prev) =>
      produce(prev, (draft) => {
        draft.choices.push('');
        return draft;
      })
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

const CreateQuiz = () => {
  const [draftQuiz, setDraftQuiz] = useRecoilState(draftQuizState);
  const [metadata, setMetadata] = useRecoilState(metadataState);

  const isFull = useMemo(() => draftQuiz.choices.length >= 4, [draftQuiz]);
  // const isShouldBe3Column = useMemo(() => draftQuiz.s.length >= 5, [draftQuiz]);
  const [width, height] = useMemo(() => {
    const l = draftQuiz.choices.length;
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
  }, [draftQuiz]);

  const handleSaveQuiz = () => {
    setMetadata((prev) => [
      ...prev,
      { createdAt: Date.now(), data: draftQuiz, type: 'q' },
    ]);
  };

  return (
    <Box overflowY="scroll" h="full">
      <Text>설문 / 퀴즈 제작 </Text>
      <Screen169>
        <Grid
          templateColumns={`repeat(${width / 25}, 1fr)`}
          width={width + '%'}
          height={height + '%'}
          gap="4"
          bgColor="gray.400"
        >
          {draftQuiz.choices.map((text, idx) => (
            <Choice key={idx} text={text} idx={idx} />
          ))}
          {!isFull && <ChoiceAdd />}
        </Grid>
      </Screen169>
    </Box>
  );
};

export default CreateQuiz;
