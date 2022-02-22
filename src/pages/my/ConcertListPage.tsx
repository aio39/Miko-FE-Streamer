import {
  Box,
  chakra,
  Flex,
  Icon,
  Image,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { S3_URL } from 'const';
import convertDate from 'helper/convertDate';
import React, { FC } from 'react';
import { MdMusicNote, MdSchedule } from 'react-icons/md';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useConcerts } from 'state/swr/useConcert';
import { Concert } from 'types/share/Concert';

const ConcertCard: FC<{ data: Concert }> = ({ data }) => {
  const startDate = convertDate(data.all_concert_start_date, 'YMDHM');
  const endDate = convertDate(data.all_concert_end_date, 'YMDHM');

  return (
    <Box
      w="sm"
      // mx="auto"
      bg={useColorModeValue('white', 'gray.800')}
      shadow="lg"
      rounded="lg"
      overflow="hidden"
    >
      <Image
        w="full"
        h={56}
        fit="cover"
        objectPosition="center"
        src={S3_URL + data.cover_image}
        alt="avatar"
      />

      <Flex alignItems="center" px={6} py={3} bg="gray.900">
        <Icon as={MdSchedule} h={6} w={6} color="white" />

        <VStack flexGrow="1">
          <chakra.h3
            mx={3}
            color="white"
            fontWeight="bold"
            fontSize="md"
            alignSelf="start"
          >
            {startDate} ~
          </chakra.h3>
          <chakra.h3
            mx={3}
            color="white"
            fontWeight="bold"
            fontSize="md"
            alignSelf="end"
          >
            {endDate}
          </chakra.h3>
        </VStack>
      </Flex>

      <Box py={4} px={6}>
        <chakra.h1
          fontSize="xl"
          fontWeight="bold"
          color={useColorModeValue('gray.800', 'white')}
        >
          {data.title}
        </chakra.h1>

        <chakra.p py={2} color={useColorModeValue('gray.700', 'gray.400')}>
          {data.detail}
        </chakra.p>

        <Flex
          alignItems="center"
          mt={4}
          color={useColorModeValue('gray.700', 'gray.200')}
        >
          <Icon as={MdMusicNote} h={6} w={6} mr={2} />

          <chakra.h1 px={2} fontSize="sm">
            {data.artist}
          </chakra.h1>
        </Flex>
      </Box>
    </Box>
  );
};

const ConcertCardList: FC = () => {
  const { data } = useConcerts({});

  return (
    <Flex
      flexWrap="wrap"
      bg={useColorModeValue('#F9FAFB', 'gray.600')}
      // p={50}
      w="full"
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      gap="20px"
    >
      {data?.data.map((data) => (
        <ConcertCard key={data.id} data={data} />
      ))}
    </Flex>
  );
};

const ConcertListPage = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  let location = useLocation();

  return (
    <Box style={{ padding: '1rem 0' }}>
      <Text>ConcertListPage</Text>
      <ConcertCardList />
    </Box>
  );
};

export default ConcertListPage;
