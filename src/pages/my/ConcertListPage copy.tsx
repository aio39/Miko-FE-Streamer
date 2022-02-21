import { Box, Text } from '@chakra-ui/react';
import { useLocation, useSearchParams } from 'react-router-dom';

const ConcertListPage = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  let location = useLocation();
  return (
    <Box style={{ padding: '1rem 0' }}>
      <Text>ConcertListPage</Text>
    </Box>
  );
};

export default ConcertListPage;
