import { Box, Button, HStack, Input, Tag, TagCloseButton, TagLabel, Text } from "@chakra-ui/react";
import { draftQuizCreatedAtState, draftQuizTagsState, draftQuizTitleState } from "@src/state/recoil/draftQuizState";
import produce from "immer";
import { FC, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { SetterOrUpdater, useRecoilState } from "recoil";

interface Props {
  createdAt: number;
  tag: [string[], SetterOrUpdater<string[]>];
  title: [string, SetterOrUpdater<string>];
  //   title: ReturnType<typeof useRecoilState<string>>
}

const EditCommonTimeMetaData: FC<Props> = () => {
  const [createdAt, setCreatedAt] = useRecoilState(draftQuizCreatedAtState);
  const [tags, setTags] = useRecoilState(draftQuizTagsState);
  const [title, setTitle] = useRecoilState(draftQuizTitleState);
  const [newTag, setNewTag] = useState("");
  const handleChangeText: React.ChangeEventHandler<HTMLInputElement> = e => {
    setTitle(e.target.value);
  };

  const handleTagRemove = (idx: number) => {
    setTags(prev =>
      produce(prev, draft => {
        draft.splice(idx, 1);
      }),
    );
  };

  const handleChangeNewTag: React.ChangeEventHandler<HTMLInputElement> = e => {
    setNewTag(e.target.value);
  };

  const handleAddTag = () => {
    setNewTag("");
    setTags(prev => [...prev, newTag]);
  };

  return (
    <Box>
      <Text>{createdAt === -1 ? "신규생성" : createdAt}</Text>
      타이틀
      <Input value={title} onChange={handleChangeText}></Input>
      <HStack spacing={4}>
        {tags.map((tag, idx) => (
          <Tag size="md" key={tag + idx} borderRadius="full" variant="solid">
            <TagLabel>{tag}</TagLabel>
            <TagCloseButton onClick={() => handleTagRemove(idx)} />
          </Tag>
        ))}
        <Input w="200px" value={newTag} onChange={handleChangeNewTag} />
        <Button onClick={handleAddTag}>
          <IoMdAdd />
        </Button>
      </HStack>
    </Box>
  );
};

export default EditCommonTimeMetaData;
