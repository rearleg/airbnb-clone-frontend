import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import useHostOnlyPage from "../components/HostOnlyPage";
import useProtectedPage from "../components/ProtectedPage";
import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { createPhoto, getUploadURL, uploadImage } from "../api";

interface IForm {
  file: FileList;
}

interface IUploadURLResponse {
  id: string;
  uploadURL: string;
}

export default function UploadPhotos() {
  const { register, handleSubmit, watch, reset } = useForm<IForm>();

  const { roomPk } = useParams();
  const toast = useToast();
  const createPhotoMutation = useMutation({
    mutationFn: createPhoto,
    onSuccess: () => {
      toast({
        status: "success",
        title: "Image Uploaded!",
        isClosable: true,
        description: "Feel free to upload more images.",
      });
      reset();
    },
  });

  const uploadImageMution = useMutation({
    mutationFn: uploadImage,
    onSuccess: ({ result }: any) => {
      if (roomPk) {
        createPhotoMutation.mutate({
          description: "I love react",
          file: `https://imagedelivery.net/9_Sc4NxpO6WeHGmWXSQxXQ/${result.id}/public`,
          roomPk,
        });
      }
    },
  });
  const uploadURLMutation = useMutation({
    mutationFn: getUploadURL,
    onSuccess: (data: IUploadURLResponse) => {
      uploadImageMution.mutate({
        uploadURL: data.uploadURL,
        file: watch("file"),
      });
    },
  });
  const onSubmit = (data: any) => {
    uploadURLMutation.mutate();
  };
  useHostOnlyPage();
  useProtectedPage();
  console.log(watch());
  return (
    <Box pb={40} mt={10} px={{ base: 10, lg: 40 }}>
      <Container>
        <Heading textAlign={"center"}>Upload a Photo</Heading>
        <VStack as="form" onSubmit={handleSubmit(onSubmit)} spacing={5} mt={10}>
          <FormControl>
            <Input {...register("file")} type="file" accept="image.*" />
          </FormControl>
          <Button
            isLoading={
              createPhotoMutation.isPending ||
              uploadImageMution.isPending ||
              uploadURLMutation.isPending
            }
            type="submit"
            w={"full"}
            colorScheme="red"
          >
            Upload photo
          </Button>
        </VStack>
      </Container>
    </Box>
  );
}
