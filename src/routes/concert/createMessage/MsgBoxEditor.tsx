import {
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { draftMsgBoxDataState } from 'recoil/draftMessageState';
import TextColorPicker from './TextColorPicker';

const MsgBoxEditor = () => {
  const [msgBoxData, setMsgBoxData] = useRecoilState(draftMsgBoxDataState);
  const { width, height, padding, round, spacing, hexColor } = msgBoxData;

  const handleChangeWidth = (value: number) => {
    setMsgBoxData((prev) => ({ ...prev, width: value }));
  };

  const handleChangeHeight = (value: number) => {
    setMsgBoxData((prev) => ({ ...prev, height: value }));
  };
  const handleChangePadding = (value: number) => {
    setMsgBoxData((prev) => ({ ...prev, padding: value }));
  };
  const handleChangeRound = (value: number) => {
    setMsgBoxData((prev) => ({ ...prev, round: value }));
  };
  const handleChangeSpacing = (value: number) => {
    setMsgBoxData((prev) => ({ ...prev, spacing: value }));
  };

  const handleChangeColor = (color: string) => {
    setMsgBoxData((prev) => ({ ...prev, hexColor: color }));
  };

  return (
    <VStack alignItems="start">
      <Text>메세지 창</Text>

      <HStack>
        <HStack>
          <Text>W</Text>
          <NumberInput
            w="5rem"
            step={10}
            defaultValue={200}
            min={100}
            max={500}
            value={width}
            onChange={(_, value) => handleChangeWidth(value)}
          >
            <NumberInputField textAlign="center" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </HStack>
        <HStack>
          <Text>P</Text>
          <NumberInput
            w="5rem"
            step={1}
            defaultValue={15}
            min={10}
            max={100}
            value={padding}
            onChange={(_, value) => handleChangePadding(value)}
          >
            <NumberInputField textAlign="center" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </HStack>
        <HStack>
          <Text>S</Text>
          <NumberInput
            w="5rem"
            step={1}
            defaultValue={15}
            min={10}
            max={100}
            value={spacing}
            onChange={(_, value) => handleChangeSpacing(value)}
          >
            <NumberInputField textAlign="center" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </HStack>
      </HStack>

      <HStack>
        <HStack>
          <Text>H</Text>
          <NumberInput
            w="5rem"
            step={10}
            defaultValue={200}
            min={100}
            max={500}
            value={height}
            onChange={(_, value) => handleChangeHeight(value)}
          >
            <NumberInputField textAlign="center" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </HStack>
        <HStack>
          <Text>R</Text>
          <NumberInput
            w="5rem"
            step={1}
            defaultValue={15}
            min={10}
            max={100}
            value={round}
            onChange={(_, value) => handleChangeRound(value)}
          >
            <NumberInputField textAlign="center" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </HStack>
      </HStack>
      <TextColorPicker color={hexColor} onChnage={handleChangeColor} />
    </VStack>
  );
};

export default MsgBoxEditor;
