import {
  Box,
  Button,
  Grid,
  HStack,
  Image,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { FaRegHeart, FaStar } from "react-icons/fa";

interface IRoomProps {
  imageUrl: string;
  name: string;
  rating: number;
  city: string;
  country: string;
  price: number;
}

export default function Room({
  imageUrl,
  name,
  rating,
  city,
  country,
  price,
}: IRoomProps) {
  const gray = useColorModeValue("gray.600", "gray.300");
  return (
    <VStack alignItems={"flex-start"} spacing={-0.5}>
      <Box position={"relative"} overflow={"hidden"} mb={4} rounded={"2xl"}>
        <Image objectFit="cover" minH={"280"} src={imageUrl} />
        <Button
          variant={"unstyled"}
          position="absolute"
          top={0}
          right={0}
          color="white"
        >
          <FaRegHeart size="20px" />
        </Button>
      </Box>
      <Box w="100%">
        <Grid gap={2} w="100%" templateColumns={"6fr 1fr"}>
          <Text as="b" noOfLines={1} fontSize={"md"}>
            {name}
          </Text>
          <HStack spacing={1}>
            <FaStar size={15} />
            <Text>{rating}</Text>
          </HStack>
        </Grid>
      </Box>
      <Text mb={2} fontSize={"sm"} color={gray}>
        {city}, {country}
      </Text>
      <Text fontSize={"sm"} color={gray}>
        <Text as="b">${price}</Text>/ night
      </Text>
    </VStack>
  );
}
