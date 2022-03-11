import { Button } from "@chakra-ui/button";
import { Box, useDisclosure, VStack } from "@chakra-ui/react";
import DateInputWrapper from "@src/components/common/inputs/DateInput";
import { InputWrapper, SelectWrapper } from "@src/components/common/inputs/HookInput";
import ImageUpload from "@src/components/common/inputs/ImageUpload";
import ModalWrapper from "@src/components/common/inputs/ModalWrapper";
import { categoryArray } from "@src/const";
import useColorStore from "@src/state/hooks/useColorStore";
import { axiosI } from "@src/state/swr/fetcher";
import { useUser } from "@src/state/swr/useUser";
import { Concert, CreateConcertData } from "@src/types/share/Concert";
import React, { useRef, useState } from "react";
import { FilePond } from "react-filepond";
import { SubmitHandler, useForm } from "react-hook-form";
import "react-modern-calendar-datepicker/lib/DatePicker.css";

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
    mode: "onChange",
  });
  const { data: userData, isNotLogged } = useUser();
  const [createdConcert, setCreatedConcert] = useState<Concert>();
  const imageUploadRef = useRef<FilePond>(null);
  const useDisclosureReturn = useDisclosure();

  // if (isNotLogged) router.push('/')

  const onSubmit: SubmitHandler<CreateConcertData> = async inputData => {
    const formData = new FormData();
    Object.entries(inputData).forEach(([key, value]) => {
      if (key === "category_id") value = categoryArray.indexOf(value as string) + 1;
      formData.set(key, value as string);
    });

    const image = imageUploadRef.current?.getFile();
    if (image) {
      formData.set("cover_image", image.file);
    }

    const { data } = await axiosI.post<Concert>(`/concerts`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
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
      <Box borderRadius="md" shadow="md" direction="column" maxW="container.xl" w="full" p="4" bg={useColorStore("surface")}>
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
            <InputWrapper registerReturn={register("artist", { required: true })} error={errors.artist} data={["참가 아티스트 리스트", "ex) 가수A"]} />
            <InputWrapper registerReturn={register("detail", { required: true })} error={errors.detail} data={["설명", "설명"]} />
            <SelectWrapper
              registerReturn={register("categoryId", {
                required: "필수 선택입니다.",
              })}
              error={errors.categoryId}
              data={["카테고리", undefined]}
              selectList={categoryArray}
            />
            <InputWrapper registerReturn={register("title", { required: true })} error={errors.title} data={["콘서트 명", "콘서트 이름"]} />
            <InputWrapper registerReturn={register("content", { required: true })} error={errors.content} data={["Content", "Content"]} />
            <DateInputWrapper setValue={setValue} registerReturn={register("allConcertStartDate")} />
            <DateInputWrapper setValue={setValue} registerReturn={register("allConcertEndDate")} />
          </VStack>

          <Button type="submit" colorScheme="blue" mt={4} mb={12} disabled={!isValid} isLoading={isSubmitting}>
            콘서트 생성
          </Button>
        </form>
      </Box>
      <ModalWrapper
        useDisclosureReturn={useDisclosureReturn}
        text={{
          title: "콘서트 생성 성공",
          close: "추가 생성",
          confirm: "콘서트 확인",
        }}
        href="/seller/shop"
      >
        {createdConcert && <>성공</>}
      </ModalWrapper>
    </Box>
  );
};

export default ConcertCreatePage;
