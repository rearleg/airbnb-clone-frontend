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
import { FaCamera, FaRegHeart, FaStar } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

interface IRoomProps {
  imageUrl: string;
  name: string;
  rating: number;
  city: string;
  country: string;
  price: number;
  pk: number;
  isOwner: boolean;
}

export default function Room({
  pk,
  imageUrl,
  name,
  rating,
  city,
  country,
  price,
  isOwner,
}: IRoomProps) {
  const navigate = useNavigate();
  const onCameraClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(`/rooms/${pk}/photos`);
  };
  const gray = useColorModeValue("gray.600", "gray.300");
  return (
    <Link to={`/rooms/${pk}`}>
      <VStack alignItems={"flex-start"} spacing={-0.5}>
        <Box position={"relative"} overflow={"hidden"} mb={4} rounded={"2xl"}>
          {imageUrl ? (
            <Image objectFit="cover" minH={"280"} src={imageUrl} />
          ) : (
            <Box minH="280px" h={"100%"} w={"100%"} p={10} bg={"greend.400"} />
          )}
          <Button
            variant={"unstyled"}
            position="absolute"
            top={0}
            right={0}
            color="white"
            onClick={onCameraClick}
          >
            {isOwner ? <FaCamera size="20px" /> : <FaRegHeart size="20px" />}
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
    </Link>
  );
}
