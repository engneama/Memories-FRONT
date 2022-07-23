import { useStyles } from "./styles";
import { Container, Title, Text, Button, Group } from "@mantine/core";

const Missing = () => {
  const { classes } = useStyles();

  return (
    <Container className={classes.root}>
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>Nothing to see here</Title>
          <Text
            color="dimmed"
            size="lg"
            align="center"
            className={classes.description}
          >
            Page you are trying to open does not exist. You may have mistyped
            the address, or the page has been moved to another URL. If you think
            this is an error contact support.
          </Text>
          <Group position="center">
            <Button size="md">Take me back to home page</Button>
          </Group>
        </div>
      </div>
    </Container>
  );
};

export default Missing;
