import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  LightMode,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { FaKey, FaUserNinja, FaEnvelope, FaUserSecret } from "react-icons/fa";
import SocialLogin from "./SocialLogin";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  IUsernameLoginError,
  IUsernameLoginSuccess,
  IUsernameSignUpVariables,
  usernameSighUp,
} from "../api";
import { AxiosError } from "axios";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IForm {
  name: string;
  email: string;
  username: string;
  password: string;
}

export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IForm>();
  const toast = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation<
    IUsernameLoginSuccess,
    AxiosError<IUsernameLoginError>,
    IUsernameSignUpVariables
  >({
    mutationFn: usernameSighUp,
    onMutate: () => {
      console.log("mutation starting");
    },
    onSuccess: () => {
      toast({ title: "welcome back!", status: "success" });
      onClose();
      queryClient.refetchQueries({ queryKey: ["me"] });
      reset();
    },
    onError: (error) => {
      console.error(error.message);
    },
  });
  const onSubmit = ({ name, email, username, password }: IForm) => {
    mutation.mutate({ name, email, username, password });
  };
  return (
    <Modal motionPreset="slideInBottom" onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sign in</ModalHeader>
        <ModalCloseButton />
        <ModalBody as={"form"} onSubmit={handleSubmit(onSubmit)}>
          <VStack>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaUserSecret />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.name?.message)}
                {...register("name", {
                  required: "Plase write a email",
                })}
                variant={"filled"}
                placeholder="Name"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaEnvelope />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.email?.message)}
                {...register("email", {
                  required: "Plase write a email",
                  pattern: {value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "옳바르지 않은 email 형식입니다."},
                })}
                variant={"filled"}
                placeholder="Email"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaUserNinja />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.username?.message)}
                {...register("username", {
                  required: "Plase write a username",
                })}
                variant={"filled"}
                placeholder="Username"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaKey />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.password?.message)}
                {...register("password", {
                  required: "Plase write a password",
                  minLength: {
                    value: 4,
                    message: "비밀번호는 최소 4글자 이상",
                  },
                })}
                type="password"
                variant={"filled"}
                placeholder="Password"
              />
            </InputGroup>
          </VStack>
          <Text color={"red.500"} fontSize={"sm"}>{errors.password?.message}</Text>
          <Text color={"red.500"} fontSize={"sm"}>{errors.email?.message}</Text>
          <LightMode>
            <Button
              isLoading={mutation.isPending}
              type="submit"
              mt={4}
              colorScheme={"red"}
              w="100%"
            >
              Sigh Up
            </Button>
          </LightMode>
          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
