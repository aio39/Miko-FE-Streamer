import {
  Box,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  VStack,
} from '@chakra-ui/react';
import { FC } from 'react';
import { ChromePicker } from 'react-color';
import { useRecoilState } from 'recoil';
import { draftMessageState } from '../../../recoil/draftMessageState';

const ColorPickerPopoverContent: FC<{ type: string; color: string }> = ({
  type,
  color,
}) => {
  const [draftMessage, setDraftMessage] = useRecoilState(draftMessageState);

  const handleChangeComplete = (color: string, property: string) => {
    setDraftMessage((pre) => ({ ...pre, [property]: color }));
  };

  return (
    <PopoverContent width="fit-content">
      <PopoverArrow />
      <PopoverBody p="0">
        <ChromePicker
          color={draftMessage.mtc}
          onChangeComplete={(color) => handleChangeComplete(color.hex, type)}
          disableAlpha
        />
      </PopoverBody>
    </PopoverContent>
  );
};

const TextColorPicker = () => {
  const [draftMessage, setDraftMessage] = useRecoilState(draftMessageState);

  const handleChangeComplete = (color: string, property: string) => {
    setDraftMessage((pre) => ({ ...pre, [property]: color }));
  };

  return (
    <VStack>
      <HStack>
        <Popover>
          <PopoverTrigger>
            <HStack>
              <Box>메인 텍스트</Box>
              <Box w="6" h="6" bgColor={draftMessage.mtc}></Box>
              <Box>{draftMessage.mtc}</Box>
            </HStack>
          </PopoverTrigger>
          <ColorPickerPopoverContent color={draftMessage.mtc} type="mtc" />
        </Popover>
      </HStack>
    </VStack>
  );
};

export default TextColorPicker;
