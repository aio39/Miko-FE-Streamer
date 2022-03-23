import { Box, Divider, Heading, Image, Tag, Text } from "@chakra-ui/react";
import { categoryArray, S3_URL } from "@src/const";
import { useConcert } from "@src/state/swr/useConcert";
import { useParams } from "react-router-dom";

const ConcertDetailPage = () => {
  let { concertId } = useParams();

  const { data: concertData } = useConcert(parseInt(concertId as string));
  if (!concertData) return <Box>Error</Box>;

  const { isPublic } = concertData.data;

  return (
    <Box padding="6" bgColor="white" width="full" height="full" borderRadius="lg">
      <Text> {">"} Concert DetailPage</Text>
      <Heading as="h1">{concertData.data.title}</Heading>
      <Heading as="h2">{concertData.data.artist}</Heading>
      <Divider />
      <Text> {categoryArray[concertData.data.categoryId]}</Text>

      <Divider />
      <Box>
        <Text>{concertData.data.content}</Text>
      </Box>
      <Box>
        <Text>{concertData.data.detail}</Text>
      </Box>
      <Divider />

      <Image width="400px" src={S3_URL + concertData.data.coverImage} alt="cover image" />
      <Tag size="md" variant="solid" colorScheme="teal">
        {isPublic ? "공개" : "비공개"}
      </Tag>
      {/* <Text>{concertData.data.user}</Text> */}
    </Box>
  );
};

export default ConcertDetailPage;
