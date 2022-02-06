import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import {
  AspectRatio,
  Box,
  Button,
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Grid,
  GridItem,
  IconButton,
  useEditableControls,
} from '@chakra-ui/react';
import { FC } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { draftMessageState } from '../../../recoil/draftMessageState';
import { metadataState } from '../../../recoil/metadataState';
import { PositionNumberRange } from '../../../types/TimeMetadataFormat';

const positionSwith = {
  1: { left: 0, top: 0 },
  2: { left: '50%', top: 0, transform: 'translate(-50%,0)' },
  3: { right: 0, top: 0 },
  4: { left: 0, top: '50%', transform: 'translate(0,-50%)' },
  5: { left: '50%', top: '50%', transform: 'translate(-50%,-50%)' },
  6: { right: 0, top: '50%', transform: 'translate(0,-50%)' },
  7: { left: 0, bottom: 0 },
  8: { left: '50%', bottom: 0, transform: 'translate(-50%,0)' },
  9: { right: 0, bottom: 0 },
};

const EditableText: FC<{ type: 'mt' | 'st' }> = ({ type }) => {
  const [draftMessage, setDraftMessage] = useRecoilState(draftMessageState);

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return (
      <Box position="absolute" right="-10px" transform="translate(100%,0)">
        {isEditing ? (
          <ButtonGroup justifyContent="center" size="sm">
            <IconButton
              icon={<CheckIcon />}
              {...getSubmitButtonProps()}
              aria-label="a"
            />
            <IconButton
              icon={<CloseIcon />}
              {...getCancelButtonProps()}
              aria-label="a"
            />
          </ButtonGroup>
        ) : (
          <Flex justifyContent="center">
            <IconButton
              size="sm"
              icon={<EditIcon />}
              {...getEditButtonProps()}
              aria-label="a"
            />
          </Flex>
        )}
      </Box>
    );
  }

  const handleOnSubmit = (text: string) => {
    switch (type) {
      case 'mt':
        setDraftMessage((pre) => ({ ...pre, mt: text }));
        break;
      case 'st':
        setDraftMessage((pre) => ({ ...pre, st: text }));
        break;
      default:
        break;
    }
  };

  return (
    <Editable
      //   textAlign="start"
      defaultValue={type === 'mt' ? draftMessage.mt : draftMessage.st}
      fontSize="2xl"
      isPreviewFocusable={false}
      width="fit-content"
      display="flex"
      position="relative"
      onSubmit={handleOnSubmit}
      placeholder={type === 'mt' ? '메인 텍스트' : '서브 텍스트'}
      color={type === 'mt' ? draftMessage.mtc : draftMessage.stc}
    >
      <EditablePreview width="fit-content" />
      <EditableInput width="fit-content" />
      <EditableControls />
    </Editable>
  );
};

const VideoMessage = () => {
  const messageState = useRecoilValue(draftMessageState);

  return (
    <Box
      position="absolute"
      {...positionSwith[messageState.p]}
      bg={messageState.bc}
    >
      {/* <Text color={messageState.mtc}>
        Lorem ipsum is placeholder text commonly used in the graphic, print, and
      </Text>
      <Text color={messageState.stc}>
        Lorem ipsum is placeholder text commonly used in the graphic, print, and
      </Text> */}
      <EditableText type="mt" />
      <EditableText type="st" />
    </Box>
  );
};

const PositionSelector = () => {
  const [draftMessage, setDraftMessage] = useRecoilState(draftMessageState);
  const { p: position } = draftMessage;

  const handleChangePosition: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target instanceof HTMLDivElement) {
      const idx = parseInt(
        e.target.dataset['idx'] as string
      ) as PositionNumberRange;
      setDraftMessage((pre) => ({ ...pre, p: idx }));
    }
  };

  return (
    <Grid
      templateColumns="repeat(3, 1fr)"
      gap={6}
      onClick={handleChangePosition}
    >
      {new Array(9).fill(0).map((_, idx) => (
        <GridItem
          key={idx + 1}
          data-idx={idx + 1}
          w="100%"
          h="10"
          bg={idx + 1 === position ? 'blue' : 'white'}
        />
      ))}
    </Grid>
  );
};

const CreateMessage = () => {
  const [draftMessage, setDraftMessage] = useRecoilState(draftMessageState);
  const [metadata, setMetadata] = useRecoilState(metadataState);

  const handleSaveMessage = () => {
    setMetadata((pre) => [...pre, draftMessage]);
  };

  return (
    <div>
      <Box>
        <AspectRatio
          position="relative"
          ratio={16 / 9}
          bgColor="blackAlpha.300"
          m="4"
        >
          <Box position="absolute" with="full" height="full">
            <VideoMessage />
          </Box>
        </AspectRatio>
      </Box>
      <PositionSelector />
      <Button colorScheme="blue" onClick={handleSaveMessage}>
        Save
      </Button>
    </div>
  );
};

export default CreateMessage;
