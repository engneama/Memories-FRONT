//Hooks
import { useState } from "react";
import { useDispatch } from "react-redux";
import useDarkMode from "Hooks/useDarkMode";
import { useStyles } from "./styles";
//Actions
import { logout } from "store/auth/auth.thunk";
//UI Components
import { Avatar, UnstyledButton, Text } from "@mantine/core";
import { Menu, Divider, Group } from "@mantine/core";
//Icons
import { FaHeart } from "react-icons/fa";
import { TbMoonStars } from "react-icons/tb";
import { TbLogout, TbMessage, TbChevronDown, TbSun } from "react-icons/tb";

const UserMenu = ({ user }) => {
  const dispatch = useDispatch();
  const toggleThemes = useDarkMode();
  const { classes, theme, cx } = useStyles();
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const logoutHandler = async () => {
    const response = await dispatch(logout());
    console.log(response);
  };

  return (
    <Menu
      size={260}
      placement="end"
      transition="pop-top-right"
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
      control={
        <UnstyledButton
          className={cx(classes.user, {
            [classes.userActive]: userMenuOpened,
          })}
        >
          <Group spacing={7}>
            <Avatar src={user.avatar} alt={user.avatar} radius="xl" size={20} />
            <Text
              className={classes.username}
              weight={500}
              size="sm"
              sx={{ lineHeight: 1 }}
              mr={3}
            >
              {user.username}
            </Text>
            <TbChevronDown size={12} />
          </Group>
        </UnstyledButton>
      }
    >
      <Menu.Label>Switch Themes</Menu.Label>
      <Menu.Item
        icon={
          toggleThemes.theme === "dark" ? (
            <TbSun size={16} color={theme.colors.yellow[6]} />
          ) : (
            <TbMoonStars size={16} color={theme.colors.blue[6]} />
          )
        }
        onClick={() => toggleThemes.toggle()}
        color={toggleThemes.theme === "dark" ? "yellow" : "blue"}
      >
        {toggleThemes.theme === "dark" ? "Light Mode" : "Dark Mode"}
      </Menu.Item>
      <Divider />
      <Menu.Label>Your Legacy</Menu.Label>
      <Menu.Item icon={<FaHeart size={14} color={theme.colors.red[6]} />}>
        Liked posts
      </Menu.Item>
      <Menu.Item icon={<TbMessage size={16} color={theme.colors.blue[6]} />}>
        Your comments
      </Menu.Item>

      <Divider />

      <Menu.Label>Logout</Menu.Label>
      <Menu.Item
        color="red"
        icon={<TbLogout size={16} />}
        onClick={logoutHandler}
      >
        Logout
      </Menu.Item>
    </Menu>
  );
};

export default UserMenu;
