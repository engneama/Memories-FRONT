//Hooks
import { useStyles } from "./styles";
//UI Components
import { Container, Group, ActionIcon } from "@mantine/core";
import { Common } from "components";
//Icons
import { TbBrandInstagram } from "react-icons/tb";
import { TbBrandTwitter, TbBrandYoutube } from "react-icons/tb";

const Footer = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Common.Logo.TextLogo />
        <Group spacing={0} className={classes.links} position="right" noWrap>
          <ActionIcon size="lg">
            <TbBrandTwitter size={18} />
          </ActionIcon>
          <ActionIcon size="lg">
            <TbBrandYoutube size={18} />
          </ActionIcon>
          <ActionIcon size="lg">
            <TbBrandInstagram size={18} />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
};

export default Footer;
