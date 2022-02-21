import {
  Box,
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import produce from 'immer';
import { FC } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { metadataState } from 'recoil/metadataState';
import {
  MessageMetadata,
  MetaData,
  QuizMetadata,
} from 'types/TimeMetadataFormat';
const MetadataMsgPreview: FC<{ data: MessageMetadata }> = ({ data }) => {
  return (
    <Box width="full" h="100" border="1px">
      <Text>{data.mainTextData.text}</Text>
      {data.subTextData && <Text>{data.subTextData.text}</Text>}
    </Box>
  );
};

const MetadataQuizPreview: FC<{ data: QuizMetadata }> = ({ data }) => {
  return (
    <Box width="full" h="100" border="1px">
      <Text>{data.mainText}</Text>
    </Box>
  );
};

const MetadataPreviewContainer: FC<{ data: MetaData }> = ({
  children,
  data,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const setMetadata = useSetRecoilState(metadataState);

  const handleRemoveMetadata = () => {
    setMetadata((prev) =>
      produce(prev, (draft) => {
        const idx = draft.findIndex((d) => d.createdAt === data.createdAt);
        draft.splice(idx, 1);
        return draft;
      })
    );
  };

  return (
    <Box width="full" h="100" border="1px" position="relative">
      <Text>{children}</Text>
      <Box
        position="absolute"
        right="0"
        bottom="0"
        w="10"
        h="10"
        bg="red"
        onClick={handleRemoveMetadata}
      ></Box>
      <Center
        position="absolute"
        right="16"
        bottom="0"
        w="10"
        h="10"
        bg="blue"
        onClick={onOpen}
      ></Center>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>데이터 전송</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>예약하기</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

const MetadataListContainer = () => {
  const metadata = useRecoilValue(metadataState);

  const metadataDrawSwitch = (data: MetaData, idx: number) => {
    switch (data.data.dataType) {
      case 'm':
        return <MetadataMsgPreview key={idx} data={data.data} />;
      case 'q':
        return <MetadataQuizPreview key={idx} data={data.data} />;
      default:
        break;
    }
  };

  console.log(metadata);

  return (
    <Box w="full">
      <Text>리스트</Text>
      <VStack>
        {metadata.map((data, idx) => {
          return (
            <MetadataPreviewContainer data={data}>
              {metadataDrawSwitch(data, idx)}
            </MetadataPreviewContainer>
          );
        })}
      </VStack>
    </Box>
  );
};

const MetadataListView = () => {
  return (
    <VStack overflowY="scroll" h="full" w="full">
      <MetadataListContainer></MetadataListContainer>
    </VStack>
  );
};

export default MetadataListView;
