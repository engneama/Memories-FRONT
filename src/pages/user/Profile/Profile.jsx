//Hooks
import { useStyles } from "./styles";
//UI Components
import { Title, Image } from "@mantine/core";

const Profile = () => {
  const { classes } = useStyles();
  return (
    <section className={classes.section}>
      <Title align="center" mb="md">
        Profile
      </Title>
      <Image
        src="https://i.giphy.com/media/SC91n06OClUZSbkmMN/giphy.webp"
        alt="work in progress"
      />
    </section>
  );
};

export default Profile;
