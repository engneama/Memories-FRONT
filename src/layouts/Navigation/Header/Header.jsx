//Hooks
import { useStyles } from "./styes";
import { useSelector } from "react-redux";
//Components
import { Link } from "react-router-dom";
//UI Components
import { Box, Button, Group, Grid, Center } from "@mantine/core";
import { Header as HeaderCom, Container } from "@mantine/core";
import { Common, Navbar } from "components";

const Header = () => {
  const { classes } = useStyles();
  const auth = useSelector((state) => state.auth);

  return (
    <HeaderCom py="sm">
      <Container>
        <Grid>
          <Grid.Col span={4}>
            <Center>
              <Box className={classes.hideOnMobile}>
                <Common.Logo.ImageLogo />
              </Box>
              <Common.Logo.TextLogo />
            </Center>
          </Grid.Col>
          <Grid.Col span={8}>
            <Group position="right">
              {/* Search Bar DESKTOP */}
              <Navbar.Search.Desk />
              {/* User Menu: shortcuts, and logout */}
              {auth?.user && <Navbar.UserMenu user={auth?.user} />}

              {/* Login & Register Buttons */}
              {!auth?.user && (
                <Group spacing="xs">
                  <Button
                    variant="light"
                    size="xs"
                    component={Link}
                    to="/login"
                  >
                    Login
                  </Button>
                  <Button size="xs" component={Link} to="/register">
                    Register
                  </Button>
                </Group>
              )}

              {/* Swtich to dark mode button */}
              <Navbar.SwitchThemes />

              {/* Search Bar MOBILE */}
              <Navbar.Search.Mob />
            </Group>
          </Grid.Col>
        </Grid>
      </Container>
    </HeaderCom>
  );
};

export default Header;
