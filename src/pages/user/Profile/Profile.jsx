//Hooks
import { useStyles } from "./styles";
import { useParams } from "react-router-dom";
//UI Components
import { Title, Image } from "@mantine/core";

const Profile = () => {
  const { classes } = useStyles();
  const { username } = useParams();
  return (
    <section className={classes.section}>
      <Title align="center" mb="md">
        Profile
      </Title>
      <Image
        src="https://i.giphy.com/media/SC91n06OClUZSbkmMN/giphy.webp"
        alt="work in progress"
        width={480}
        mx="auto"
      />
    </section>
  );
};

export default Profile;
