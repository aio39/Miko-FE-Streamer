import { Box, Text, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import { useRecoilValue } from 'recoil';
import { metadataState } from '../../../recoil/metadataState';
import {
  MessageMetadata,
  MetadataFormats,
} from '../../../types/TimeMetadataFormat';

const MetadataMsgPreview: FC<{ data: MessageMetadata }> = ({ data }) => {
  return (
    <Box width="full" h="100" border="1px">
      <Text>{data.mt}</Text>
      <Text>{data.st}</Text>
    </Box>
  );
};

const MetadataListContainer = () => {
  const metadata = useRecoilValue(metadataState);

  const metadataDrawSwitch = (data: MetadataFormats, idx: number) => {
    switch (data.d) {
      case 'm':
        return <MetadataMsgPreview key={idx} data={data} />;
      default:
        break;
    }
  };

  console.log(metadata);

  return (
    <Box w="full">
      <Text>리스트</Text>
      <VStack>
        {metadata.map((data, idx) => metadataDrawSwitch(data, idx))}
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
