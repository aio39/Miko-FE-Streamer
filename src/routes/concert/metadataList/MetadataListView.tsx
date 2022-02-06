import { Box, Text, VStack } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import { metadataState } from '../../../recoil/metadataState';
import { MetadataFormats } from '../../../types/TimeMetadataFormat';

const MetadataListContainer = () => {
  const metadata = useRecoilValue(metadataState);

  const metadataDrawSwitch = (data: MetadataFormats, idx: number) => {
    return <div key={idx}>a</div>;
  };

  return (
    <Box>
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
