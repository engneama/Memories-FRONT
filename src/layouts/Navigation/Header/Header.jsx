//Hooks
import { useStyles } from "./styes";
import { useSelector } from "react-redux";
//Components
import { Link } from "react-router-dom";
import UserMenu from "components/UserMenu/UserMenu";
//UI Components
import { Box, Button, Group, Grid } from "@mantine/core";
import { Header as HeaderCom, Container } from "@mantine/core";
import SwitchTheme from "components/SwitchThemesButton/SwitchThemeButton";
import { Common } from "components";

const Header = () => {
  const { classes } = useStyles();
  const auth = useSelector((state) => state.auth);

  return (
    <HeaderCom py="sm">
      <Container>
        <Grid>
          <Grid.Col span={4}>
            <Group>
              <Box className={classes.hideOnMobile}>
                <Common.Logo.ImageLogo />
              </Box>
              <Common.Logo.TextLogo />
            </Group>
          </Grid.Col>
          <Grid.Col span={8}>
            <Group position="right">
              {/* User Menu: shortcuts, and logout */}
              {auth?.user && <UserMenu user={auth?.user} />}

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
              <SwitchTheme />
            </Group>
          </Grid.Col>
        </Grid>
      </Container>
    </HeaderCom>
  );
};

export default Header;
