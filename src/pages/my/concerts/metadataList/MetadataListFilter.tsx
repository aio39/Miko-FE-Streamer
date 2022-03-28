import { Badge, Box, Flex, Heading, Input, Select, Stack } from "@chakra-ui/react";
import { metadataListFilterUsedState } from "@src/state/recoil/metadataState";
import { useRecoilState } from "recoil";

const UsedFilter = () => {
  const [used, setUsed] = useRecoilState(metadataListFilterUsedState);

  const usedBadge = () => {
    if (used === "all") return <Badge>全部</Badge>;
    if (used === "notUsed") return <Badge>使用前</Badge>;
    if (used === "used") return <Badge>使用済み</Badge>;
  };

  console.log("used", used);

  const handleChangeUsed = () => {
    if (used === "all") return setUsed("notUsed");
    if (used === "notUsed") return setUsed("used");
    if (used === "used") return setUsed("all");
  };

  return (
    <Box w="100px" onClick={handleChangeUsed}>
      {usedBadge()}
    </Box>
  );
};

//  검색
// 태그
//  미사용
//
const MetadataListFilter = () => {
  return (
    <Flex flexDir="column">
      <Heading size="md">メタデータリスト</Heading>
      <Flex>
        <UsedFilter />
        <Input />
        <Stack spacing={3}>
          <Select placeholder="Select option">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default MetadataListFilter;
