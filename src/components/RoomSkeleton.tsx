import { Box, Skeleton, SkeletonText } from "@chakra-ui/react";

export default function RoomSkeleton() {
  return (
    <Box>
      <Skeleton height={280} rounded={"2xl"} mb={6} variant="shine" />
      <SkeletonText noOfLines={2} mb={6} spacing={3} />
      <SkeletonText w={"20%"} noOfLines={1} />
    </Box>
  )
}