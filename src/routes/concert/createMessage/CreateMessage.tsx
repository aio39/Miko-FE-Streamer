import { Box, HStack } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import Screen169 from '../../../components/hoc/Screen169';
import {
  draftMsgBoxDataState,
  draftMsgMainTextState,
  draftMsgPositionState,
  draftMsgSubTextState,
} from '../../../recoil/draftMessageState';
import CreateBtn from './CreateBtn';
import DragTest from './DragTest';
import LinkInput from './LinkInput';
import MsgBoxEditor from './MsgBoxEditor';
import MsgEtcDataEditor from './MsgEtcDataEditor';
import MsgResetBtn from './MsgResetBtn';
import MsgTextEditor from './MsgTextEditor copy';
import { PositionSelector } from './PositionSelector';

// const EditableText: FC<{ type: 'mt' | 'st' }> = ({ type }) => {
//   const draftMessage = useRecoilValue(draftMsgState);

//   function EditableControls() {
//     const {
//       isEditing,
//       getSubmitButtonProps,
//       getCancelButtonProps,
//       getEditButtonProps,
//     } = useEditableControls();

//     return (
//       <Box position="absolute" right="-10px" transform="translate(100%,0)">
//         {isEditing ? (
//           <ButtonGroup justifyContent="center" size="sm">
//             <IconButton
//               icon={<CheckIcon />}
//               {...getSubmitButtonProps()}
//               aria-label="a"
//             />
//             <IconButton
//               icon={<CloseIcon />}
//               {...getCancelButtonProps()}
//               aria-label="a"
//             />
//           </ButtonGroup>
//         ) : (
//           <Flex justifyContent="center">
//             <IconButton
//               size="sm"
//               icon={<EditIcon />}
//               {...getEditButtonProps()}
//               aria-label="a"
//             />
//           </Flex>
//         )}
//       </Box>
//     );
//   }

//   const handleOnSubmit = (text: string) => {
//     switch (type) {
//       case 'mt':
//         setDraftMessage((pre) => ({ ...pre, mt: text }));
//         break;
//       case 'st':
//         setDraftMessage((pre) => ({ ...pre, st: text }));
//         break;
//       default:
//         break;
//     }
//   };

//   return (
//     <Editable
//       //   textAlign="start"
//       defaultValue={type === 'mt' ? draftMessage.mt : draftMessage.st}
//       fontSize="2xl"
//       isPreviewFocusable={false}
//       width="auto"
//       display="flex"
//       position="relative"
//       onSubmit={handleOnSubmit}
//       placeholder={type === 'mt' ? '메인 텍스트' : '서브 텍스트'}
//       color={type === 'mt' ? draftMessage.mtc : draftMessage.stc}
//     >
//       <EditablePreview />
//       <EditableInput width="auto" />
//       <EditableControls />
//     </Editable>
//   );
// };

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

const VideoMessage = () => {
  const positionIndex = useRecoilValue(draftMsgPositionState);
  const boxData = useRecoilValue(draftMsgBoxDataState);
  return (
    <Box
      position="absolute"
      {...positionSwith[positionIndex]}
      bgColor={boxData?.hexColor}
    >
      {/* <EditableText type="mt" />
      <EditableText type="st" /> */}
    </Box>
  );
};

const CreateMsg = () => {
  return (
    <Box overflowY="scroll" h="full">
      <Box>
        <Screen169>
          <VideoMessage />
        </Screen169>
      </Box>
      <HStack>
        <PositionSelector />
        <MsgBoxEditor />
        <MsgTextEditor />
        <MsgEtcDataEditor atom={draftMsgMainTextState} type="main" />
        <MsgEtcDataEditor atom={draftMsgSubTextState} type="sub" />
      </HStack>
      <LinkInput />
      <CreateBtn />
      <MsgResetBtn></MsgResetBtn>
      <DragTest />
    </Box>
  );
};

export default CreateMsg;
