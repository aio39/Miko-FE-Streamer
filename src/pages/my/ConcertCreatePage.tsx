import { Button } from '@chakra-ui/button';
import { Box, useDisclosure, VStack } from '@chakra-ui/react';
import {
  InputWrapper,
  SelectWrapper,
} from 'components/common/inputs/HookInput';
import ImageUpload from 'components/common/inputs/ImageUpload';
import { categoryArray } from 'const';
import React, { useRef, useState } from 'react';
import { FilePond } from 'react-filepond';
import { SubmitHandler, useForm } from 'react-hook-form';
import useColorStore from 'state/hooks/useColorStore';
import { axiosI } from 'state/swr/fetcher';
import { useUser } from 'state/swr/useUser';
import { Concert, CreateConcertData } from 'types/share/Concert';

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
  const { data: userData, isNotLogged } = useUser();
  const [createdMenu, setCreatedMenu] = useState<Concert>();
  const imageUploadRef = useRef<FilePond>(null);
  const useDisclosureReturn = useDisclosure();

  // if (isNotLogged) router.push('/')

  const onSubmit: SubmitHandler<CreateConcertData> = async (inputData) => {
    const formData = new FormData();
    Object.entries(inputData).forEach(([key, value]) => {
      // if (typeof value === 'number') value = value.toString();
      formData.set(key, value);
    });

    const image = imageUploadRef.current?.getFile();
    if (image) {
      formData.set('image', image.file);
    }

    const { data } = await axiosI.post<Concert>(`/api/menus`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (data) {
      setCreatedMenu(data);
      useDisclosureReturn.onOpen();
    }
  };
  return (
    <Box>
      <Box
        borderRadius="md"
        shadow="md"
        direction="column"
        maxW="container.xl"
        w="full"
        p="4"
        bg={useColorStore('surface')}
      >
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
            <InputWrapper
              registerReturn={register('artist', { required: true })}
              error={errors.artist}
              data={['구독 모델 이름', '모델명']}
            />
            <InputWrapper
              registerReturn={register('detail', { required: true })}
              error={errors.detail}
              data={['설명', '구독에 대한 설명']}
            />
            <SelectWrapper
              registerReturn={register('category_id', {
                required: '필수 선택입니다.',
              })}
              error={errors.category_id}
              data={['업종', undefined]}
              selectList={categoryArray}
            />
            <InputWrapper
              registerReturn={register('title', { required: true })}
              error={errors.title}
              data={['설명', '구독에 대한 설명']}
            />
            <InputWrapper
              registerReturn={register('content', { required: true })}
              error={errors.content}
              data={['설명', '구독에 대한 설명']}
            />
            {/* <NumberInputWrapper
              registerReturn={register('cycle_month', {
                max: 12,
                min: 1,
                required: true,
              })}
              error={errors.cycle_month}
              data={['결제 주기 월', '메뉴에 대한 설명']}
              min={1}
              max={12}
            />
            <NumberInputWrapper
              registerReturn={register('price', { min: 0, required: true })}
              error={errors.price}
              data={['가격 설정', '결제 주기 마다 결제되는 가격']}
              min={0}
            />
            <Divider />
            <Text fontSize="xl">사용 한도 설정</Text>

            <NumberInputWrapper
              registerReturn={register('limit_day')}
              error={errors.limit_day}
              data={['1일 사용 횟수', '공란 미설정']}
              isNotRequired
              min={0}
            />
            <NumberInputWrapper
              registerReturn={register('limit_week')}
              error={errors.limit_week}
              data={['일주일 사용 회숫', '공란 미설정']}
              isNotRequired
              min={0}
            />
            <NumberInputWrapper
              registerReturn={register('limit_month')}
              error={errors.limit_month}
              data={['월 사용 횟수', '공란 미설정']}
              isNotRequired
              min={0}
            />
            <NumberInputWrapper
              registerReturn={register('limit_year')}
              error={errors.limit_year}
              data={['연 사용 횟수', '공란 미설정']}
              isNotRequired
              min={0}
            /> */}
          </VStack>

          <Button
            type="submit"
            colorScheme="blue"
            mt={4}
            mb={12}
            disabled={!isValid}
            isLoading={isSubmitting}
          >
            메뉴 생성
          </Button>
        </form>
      </Box>
      {/* <ModalWrapper
        useDisclosureReturn={useDisclosureReturn}
        text={{
          title: '메뉴 생성 성공',
          close: '추가 생성',
          confirm: '메뉴 확인',
        }}
        href="/seller/shop"
      >
        {createdMenu && <>성공</>}
      </ModalWrapper> */}
    </Box>
  );
};

export default ConcertCreatePage;
