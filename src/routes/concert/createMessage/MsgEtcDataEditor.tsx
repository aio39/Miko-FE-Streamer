import {
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react';

const MsgEtcDataEditor = () => {
  return (
    <VStack>
      <Text>메인 텍스트</Text>
      <HStack>
        <Text>S</Text>
        <NumberInput w="5rem" step={5} defaultValue={15} min={10} max={30}>
          <NumberInputField textAlign="center" />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </HStack>
      <HStack>
        <Text>B</Text>
        <NumberInput w="5rem" step={5} defaultValue={15} min={10} max={30}>
          <NumberInputField textAlign="center" />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        f
      </HStack>
      <HStack>
        <Select placeholder="Font" title="font selection" name="font">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
      </HStack>
    </VStack>
  );
};

export default MsgEtcDataEditor;
