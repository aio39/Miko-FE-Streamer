import { Box, Center, Grid, Text } from "@chakra-ui/react";
import Screen169 from "@src/components/hoc/Screen169";
import { draftQuizChoicesState, draftQuizState } from "@src/state/recoil/draftQuizState";
import { useMemo } from "react";
import { useRecoilState } from "recoil";
import SaveMetaDataBtn from "../../../../components/button/SaveQuizBtn";
import ChoiceAddBox from "./ChoiceAddBox";
import ChoiceBox from "./ChoiceBox";
import QuizTitle from "./QuizTitle";

// const ChoiceCreate = () => {
//   return <GridItem bgColor="white" borderRadius="2xl" p="3"></GridItem>;
// };

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
        <Center w="full" h="full" flexDir="column">
          <QuizTitle />
          <Grid templateColumns={`repeat(${width / 25}, 1fr)`} width={width + "%"} height={height + "%"} gap="4" bgColor="gray.400">
            {draftQuizChoices?.map((text, idx) => (
              <ChoiceBox key={idx} text={text} idx={idx} />
            ))}
            {!isFull && <ChoiceAddBox />}
          </Grid>
        </Center>
      </Screen169>
      <SaveMetaDataBtn savedMetaData={draftQuiz} />
    </Box>
  );
};

export default CreateQuiz;
