import React from "react";
import { useStyles } from "./styles";
import { Container, Group, ActionIcon } from "@mantine/core";
import {
  TbBrandTwitter,
  TbBrandYoutube,
  TbBrandInstagram,
} from "react-icons/tb";

const Footer = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <h3>LOGO</h3>
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
