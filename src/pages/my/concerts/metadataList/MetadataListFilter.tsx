import { Badge, Box, Flex, Heading, Input, Select, Stack } from "@chakra-ui/react";
import { metadataListFilterTagState, metadataListFilterUsedState, metadataTagListState } from "@src/state/recoil/metadataState";
import { ChangeEventHandler } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

const UsedFilter = () => {
  const [used, setUsed] = useRecoilState(metadataListFilterUsedState);

  const usedBadge = () => {
    if (used === "all") return <Badge>全部</Badge>;
    if (used === "notUsed") return <Badge>使用前</Badge>;
    if (used === "used") return <Badge>使用済み</Badge>;
  };

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

const TagFilter = () => {
  const tagList = useRecoilValue(metadataTagListState);
  const [tag, setTag] = useRecoilState(metadataListFilterTagState);

  const handleTagSelect: ChangeEventHandler<HTMLSelectElement> = e => {
    setTag(e.target.value);
  };

  return (
    <Select placeholder="Select option" onChange={handleTagSelect} value={tag} defaultValue={tag}>
      <option key={" "} value={" "}>
        タグ
      </option>
      {tagList.map(tag => (
        <option key={tag} value={tag}>
          {tag}
        </option>
      ))}
    </Select>
  );
};

//  검색
// 태그

const MetadataListFilter = () => {
  return (
    <Flex flexDir="column">
      <Heading size="md">メタデータリスト</Heading>
      <Flex>
        <UsedFilter />
        <Input />
        <Stack spacing={3}>
          <TagFilter />
        </Stack>
      </Flex>
    </Flex>
  );
};

export default MetadataListFilter;
