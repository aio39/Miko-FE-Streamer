import 'react-modern-calendar-datepicker/lib/DatePicker.css';

import { Button } from '@chakra-ui/button';
import { Box, Heading, useDisclosure, VStack } from '@chakra-ui/react';
import DateInputWrapper from '@src/components/common/inputs/DateInput';
import { InputWrapper, SelectWrapper } from '@src/components/common/inputs/HookInput';
import ImageUpload from '@src/components/common/inputs/ImageUpload';
import ModalWrapper from '@src/components/common/inputs/ModalWrapper';
import { categoryArray } from '@src/const';
import useColorStore from '@src/state/hooks/useColorStore';
import { axiosI } from '@src/state/swr/fetcher';
import { useUser } from '@src/state/swr/useUser';
import { Concert, CreateConcertData } from '@src/types/share/Concert';
import React, { useRef, useState } from 'react';
import { FilePond } from 'react-filepond';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Descendant } from 'slate';

import RichTextExample from '../../../components/markdownEditor/MarkDownEditor';

interface FormInputs {
  name: string;
}

const ConcertCreatePage = () => {
  const {
    handleSubmit,
    watch,
    setValue,
    register,
    getValues,
    formState: { isSubmitting, errors, isValid },
  } = useForm<CreateConcertData>({
    mode: 'onChange',
  });
  const { data: userData } = useUser();
  const [createdConcert, setCreatedConcert] = useState<Concert>();
  const imageUploadRef = useRef<FilePond>(null);
  const useDisclosureReturn = useDisclosure();
  const [content, setContent] = useState<Descendant[]>([
    {
      type: 'paragraph',
      children: [{ text: 'This is editable ' }],
    },
  ]);

  const onSubmit: SubmitHandler<CreateConcertData> = async (inputData) => {
    const formData = new FormData();
    Object.entries(inputData).forEach(([key, value]) => {
      if (key === 'categoryId') value = categoryArray.indexOf(value as string) + 1;
      formData.set(key, value as string);
    });

    const image = imageUploadRef.current?.getFile();
    if (image) {
      formData.set('cover_image', image.file);
    }
    formData.set('content', JSON.stringify(content));

    const { data } = await axiosI.post<Concert>(`/concerts`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (data) {
      console.log(data);
      setCreatedConcert(data);
      useDisclosureReturn.onOpen();
    }
  };

  return (
    <Box>
      <Box borderRadius="md" shadow="md" maxW="container.xl" w="full" p="4" bg={useColorStore('surface')}>
        <Button
          onClick={() => {
            console.log(imageUploadRef.current?.getFile());
          }}
        >
          test
        </Button>
        <ImageUpload ref={imageUploadRef}></ImageUpload>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <VStack spacing="10">
            <InputWrapper registerReturn={register('artist', { required: true })} error={errors.artist} data={['?????? ???????????? ?????????', 'ex) ??????A']} />
            <InputWrapper registerReturn={register('detail', { required: true })} error={errors.detail} data={['??????', '??????']} />
            <Heading as="h3" size="lg">
              ???????????????
            </Heading>
            <RichTextExample value={content} setValue={setContent} />
            <SelectWrapper
              registerReturn={register('categoryId', {
                required: '?????? ???????????????.',
              })}
              error={errors.categoryId}
              data={['????????????', undefined]}
              selectList={categoryArray}
            />
            <InputWrapper registerReturn={register('title', { required: true })} error={errors.title} data={['????????? ???', '????????? ??????']} />
            {/* <InputWrapper registerReturn={register("content", { required: true })} error={errors.content} data={["Content", "Content"]} /> */}
            <Heading size="md">????????? ?????? ??????</Heading>
            <DateInputWrapper setValue={setValue} registerReturn={register('allConcertStartDate')} />
            <Heading size="md">????????? ?????? ??????</Heading>
            <DateInputWrapper setValue={setValue} registerReturn={register('allConcertEndDate')} />
          </VStack>

          <Button type="submit" colorScheme="blue" mt={4} mb={12} disabled={!isValid} isLoading={isSubmitting}>
            ????????? ??????
          </Button>
        </form>
      </Box>
      <ModalWrapper
        useDisclosureReturn={useDisclosureReturn}
        text={{
          title: '????????? ?????? ??????',
          close: '?????? ??????',
          confirm: '????????? ??????',
        }}
        href="/my/concerts"
      >
        {createdConcert && <>??????</>}
      </ModalWrapper>
    </Box>
  );
};

export default ConcertCreatePage;
