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
import { draftMsgMainTextState } from '../../../recoil/draftMessageState';

const ColorPickerPopoverContent: FC<{ type: string; color: string }> = ({
  type,
  color,
}) => {
  const [draftMsgMainText, setDraftMsgMainText] = useRecoilState(
    draftMsgMainTextState
  );

  const handleChangeComplete = (color: string, property: string) => {
    setDraftMsgMainText((pre) => ({ ...pre, hexColor: color }));
  };

  return (
    <PopoverContent width="fit-content">
      <PopoverArrow />
      <PopoverBody p="0">
        <ChromePicker
          color={draftMsgMainText.hexColor}
          onChangeComplete={(color) => handleChangeComplete(color.hex, type)}
          disableAlpha
        />
      </PopoverBody>
    </PopoverContent>
  );
};

const TextColorPicker = () => {
  const [draftMsgMainText, setDraftMsgMainText] = useRecoilState(
    draftMsgMainTextState
  );

  return (
    <VStack>
      <HStack>
        <Popover>
          <PopoverTrigger>
            <HStack>
              <Box>메인 텍스트</Box>
              <Box w="6" h="6" bgColor={draftMsgMainText.hexColor}></Box>
              <Box>{draftMsgMainText.text}</Box>
            </HStack>
          </PopoverTrigger>
          <ColorPickerPopoverContent
            color={draftMsgMainText.hexColor}
            type="mtc"
          />
        </Popover>
      </HStack>
    </VStack>
  );
};

export default TextColorPicker;
