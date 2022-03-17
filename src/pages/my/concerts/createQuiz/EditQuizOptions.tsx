import { Box, HStack, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text } from "@chakra-ui/react";
import { draftQuizDurationTimeState } from "@src/state/recoil/draftQuizState";
import { useRecoilState } from "recoil";

const MIN_QUIZ_DURATION_SECONDS = 10;
const MAX_QUIZ_DURATION_SECONDS = 300;

const EditQuizOptions = () => {
  const [durationTime, setDurationTime] = useRecoilState(draftQuizDurationTimeState);

  const handleChangeDurationTime = (value: number) => {
    setDurationTime(value);
  };

  return (
    <Box>
      <HStack>
        <Text>지속 시간</Text>
        <NumberInput
          w="5rem"
          step={1}
          defaultValue={10}
          min={MIN_QUIZ_DURATION_SECONDS}
          max={MAX_QUIZ_DURATION_SECONDS}
          value={durationTime}
          onChange={(_, value) => handleChangeDurationTime(value)}
        >
          <NumberInputField textAlign="center" />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </HStack>
    </Box>
  );
};

export default EditQuizOptions;
