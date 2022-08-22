//Hooks
import { useStyles } from "./styles";
//Components
import { Link } from "react-router-dom";
//UI Components
import { UserInfo, LikesBadge } from "./subComponents";
import { Card, Text, Image, Button, Box, Anchor } from "@mantine/core";
//Icons
import { TbEdit, TbTrash } from "react-icons/tb";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const Memory = ({ data, user, like, edit, _delete }) => {
  const { classes } = useStyles();
  //Checkers
  const isLoggedIn = user._id !== undefined;
  const isAuthor = data.author._id === user._id;
  const isAdmin = user.role === "admin";

  const tags = data.tags.map((tag) => (
    <Text size="sm" color="dimmed" key={tag} component={Link} to={`/`}>
      {`#${tag} `}
    </Text>
  ));

  const likeIcon = data.likes.includes(user._id) ? (
    <AiFillHeart size={18} color="red" />
  ) : (
    <AiOutlineHeart size={18} color="red" />
  );

  return (
    <Card withBorder className={classes.card}>
      {/* Image Cover */}
      <Card.Section
        className={classes.coverWrapper}
        component={Link}
        to={`/memory/${data._id}`}
      >
        <Image
          src={data.coverURL}
          alt={data.description}
          height={420}
          withPlaceholder
          className={classes.cover}
        />
        {/* Overlay */}
        <div className={classes.overlay} />

        {/* userInfo */}
        <UserInfo
          styles={classes.userInfo}
          URL={data.author.avatarURL}
          username={data.author.username}
          time={data.createdAt}
        />

        {/* Likes Badge */}
        <LikesBadge
          badgeStyles={classes.badge}
          likesStyles={classes.likes}
          likes={data.likes.length}
        />
      </Card.Section>

      {/* Memory Details */}
      <Card.Section pl="sm" pr="sm" my="md">
        <div>
          {/* Title and Description */}
          <Text
            weight={700}
            size="xl"
            transform="capitalize"
            component={Link}
            to={`/memory/${data._id}`}
          >
            {data.title}
          </Text>
          <Text>
            {data.description}
            {" ..."}
            {
              <Anchor component={Link} to={`/memory/${data._id}`}>
                read more
              </Anchor>
            }
          </Text>
        </div>

        {/* Tags */}
        <Box className={classes.tags} mb="sm" mt="md">
          {tags}
        </Box>
      </Card.Section>

      {/* Buttons */}
      {isLoggedIn && (
        <Card.Section withBorder p="sm" className={classes.buttons}>
          {/* Like Button */}
          <Button
            fullWidth
            variant="light"
            color="pink"
            onClick={() =>
              like({ _id: data._id, userId: user._id, type: "card" })
            }
          >
            {likeIcon}
          </Button>

          {/* Edit Button */}
          {(isAuthor || isAdmin) && (
            <Button fullWidth variant="light" onClick={() => edit(data)}>
              <TbEdit size={18} />
            </Button>
          )}

          {/* Delete Button */}
          {(isAuthor || isAdmin) && (
            <Button
              variant="light"
              color="yellow"
              onClick={() => _delete({ _id: data._id, public_id: data.cover })}
            >
              <TbTrash size={18} color="orange" />
            </Button>
          )}
        </Card.Section>
      )}
    </Card>
  );
};

export default Memory;
