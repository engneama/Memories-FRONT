//Hooks
import { useStyles } from "./styes";
import { useSelector } from "react-redux";
//Components
import { Link } from "react-router-dom";
import UserMenu from "layouts/UserMenu/UserMenu";
//UI Components
import { Box, Button, Group, Grid } from "@mantine/core";
import { Header as HeaderCom, Container } from "@mantine/core";
import SwitchTheme from "components/SwitchThemesButton/SwitchThemeButton";
import TextLogo from "components/common/Logo/TextLogo";
import ImageLogo from "components/common/Logo/ImageLogo";

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
                <ImageLogo />
              </Box>

              <TextLogo />
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
              {!auth?.user && <SwitchTheme />}
            </Group>
          </Grid.Col>
        </Grid>
      </Container>
    </HeaderCom>
  );
};

export default Header;
