import {
  Box,
  Button,
  Center,
  HStack,
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
} from "@chakra-ui/react";
import { Message, NODE_URL, Quiz } from "@src/const";
import { draftMsgState } from "@src/state/recoil/draftMessageState";
import { draftQuizState } from "@src/state/recoil/draftQuizState";
import { metadataState } from "@src/state/recoil/metadataState";
import { selectedWindowState } from "@src/state/recoil/selectedWindowState";
import { useConcert } from "@src/state/swr/useConcert";
import { PushMetaDataResponse } from "@src/types/aws/ivs/pushMetaDataResponse";
import { MessageMainMetadata, MetaData, QuizMainMetadata } from "@src/types/TimeMetadataFormat";
import axios from "axios";
import produce from "immer";
import { FC } from "react";
import { FiDelete, FiEdit, FiSend } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";

const pushMetaData = async (channelArn: string, metadata: any) => {
  const result = await axios
    .post<PushMetaDataResponse>(`${NODE_URL}/ivs/metadata`, {
      channelArn,
      metadata,
    })
    .catch(e => {
      console.log(e);
    });

  if (result) {
    if (result.data.result.$metadata.httpStatusCode) {
      console.log("성공");
    }
  }
};

const MetadataMsgPreview: FC<{ data: MessageMainMetadata }> = ({ data }) => {
  return (
    <Box width="full" h="100" border="1px">
      <Text>{data.mainTextData.text}</Text>
      {data.subTextData && <Text>{data.subTextData.text}</Text>}
    </Box>
  );
};

const MetadataQuizPreview: FC<{ data: QuizMainMetadata }> = ({ data }) => {
  const { choices, dataType, durationTime, mainText } = data;
  return (
    <Box width="full" h="full" border="1px" padding="2">
      <Text fontSize="xl">Quiz</Text>
      <Text fontSize="2xl">{data.mainText}</Text>
      {choices.map((text, idx) => (
        <Text fontSize="large" key={idx}>
          {idx + 1}.{text}{" "}
        </Text>
      ))}
    </Box>
  );
};

const MetadataPreviewContainer: FC<{ data: MetaData }> = ({ children, data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const setSelectedWindow = useSetRecoilState(selectedWindowState);
  const setDraftQuiz = useSetRecoilState(draftQuizState);
  const setDraftMsg = useSetRecoilState(draftMsgState);
  // const concert = useRecoilValue(concertDataState);
  const params = useParams();
  const { data: concertData, mutate } = useConcert(parseInt(params.concertId as string));
  const setMetadata = useSetRecoilState(metadataState);

  const handleRemoveMetadata = () => {
    setMetadata(prev =>
      produce(prev, draft => {
        const idx = draft.findIndex(d => d.createdAt === data.createdAt);
        draft.splice(idx, 1);
        return draft;
      }),
    );
  };

  const handleEditBtn = () => {
    if (data.type === "q") {
      setDraftQuiz(data);
      setSelectedWindow(Quiz);
    }
    if (data.type === "m") {
      setDraftMsg(data);
      setSelectedWindow(Message);
    }
  };

  return (
    <Box width="full" border="1px" position="relative">
      <Box>{children}</Box>
      <HStack position="absolute" right="0" bottom="0">
        <Center onClick={handleEditBtn}>
          <FiEdit size="30px" color="#39c7bb" />
        </Center>
        <Center onClick={onOpen}>
          <FiSend size="30px" color="#2b8ceb" />
        </Center>
        <Center onClick={handleRemoveMetadata}>
          <FiDelete size="30px" color="b00020" />
        </Center>
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>데이터 전송</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>예약하기</Text>
            {concertData && <Button onClick={() => pushMetaData(concertData.data.channelArn, data)}>지금 보내기</Button>}
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
      case "m":
        return <MetadataMsgPreview key={idx} data={data.data} />;
      case "q":
        return <MetadataQuizPreview key={idx} data={data.data} />;
      default:
        break;
    }
  };

  console.log(metadata);

  return (
    <Box w="full">
      <Text>리스트</Text>
      <VStack h="full">
        {metadata.map((data, idx) => {
          return (
            <MetadataPreviewContainer key={data.createdAt} data={data}>
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
