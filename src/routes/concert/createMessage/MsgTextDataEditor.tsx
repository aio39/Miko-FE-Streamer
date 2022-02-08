import {
  HStack,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FC } from 'react';
import { RecoilState, useRecoilState } from 'recoil';
import { MsgTextData } from '../../../types/TimeMetadataFormat';
import TextColorPicker from './TextColorPicker';

const MsgTextDataEditor: FC<{
  atom: RecoilState<MsgTextData>;
  type: 'main' | 'sub';
}> = ({ atom, type }) => {
  const [msgTextData, setMsgTextData] = useRecoilState(atom);
  const { text, size, bold, font, hexColor } = msgTextData;

  const handleChangeText: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setMsgTextData((prev) => ({ ...prev, text: e.target.value }));
  };

  const handleChangeSize = (value: number) => {
    setMsgTextData((prev) => ({ ...prev, size: value }));
  };

  const handleChangeBold = (value: number) => {
    setMsgTextData((prev) => ({ ...prev, bold: value }));
  };

  const handleChangeFont: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    setMsgTextData((prev) => ({ ...prev, font: e.target.value }));
  };

  const handleChangeColor = (color: string) => {
    setMsgTextData((prev) => ({ ...prev, hexColor: color }));
  };

  return (
    <VStack>
      <Text>{type === 'main' ? '메인 텍스트' : '서브 텍스트'}</Text>
      <Input value={text} onChange={handleChangeText}></Input>
      <HStack>
        <HStack>
          <Text>S</Text>
          <NumberInput
            w="5rem"
            step={1}
            defaultValue={15}
            min={10}
            max={100}
            value={size}
            onChange={(_, value) => handleChangeSize(value)}
          >
            <NumberInputField textAlign="center" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </HStack>
        <HStack>
          <Text>B</Text>
          <NumberInput
            w="5rem"
            step={100}
            defaultValue={600}
            min={100}
            max={900}
            value={bold}
            onChange={(_, value) => handleChangeBold(value)}
          >
            <NumberInputField textAlign="center" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          f
        </HStack>
        <HStack>
          <Select placeholder="Font" value={font} onChange={handleChangeFont}>
            <option value="sans-serif">sans-serif</option>
            <option value="system-ui">system-ui</option>
            <option value="Georigia">Georigia</option>
            <option value="monospace">monospace</option>
          </Select>
        </HStack>
      </HStack>
      <TextColorPicker color={hexColor} onChnage={handleChangeColor} />
    </VStack>
  );
};

export default MsgTextDataEditor;
