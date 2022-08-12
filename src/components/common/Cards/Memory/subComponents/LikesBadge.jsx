import { Badge, Text } from "@mantine/core";
import { AiFillHeart } from "react-icons/ai";

const LikesBadge = ({ badgeStyles, likesStyles, likes }) => {
  return (
    <Badge
      className={badgeStyles}
      variant="light"
      color="pink"
      leftSection={<AiFillHeart />}
    >
      <Text className={likesStyles}>{likes} likes</Text>
    </Badge>
  );
};

export default LikesBadge;
