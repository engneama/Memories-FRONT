//Hooks
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useStyles } from "./styles";
//Actions
import { logout } from "store/auth/auth.thunk";
//Components
import { Link } from "react-router-dom";
//UI Components
import { Avatar, UnstyledButton, Text } from "@mantine/core";
import { Menu, Divider, Group } from "@mantine/core";
//Icons
import { FaHeart } from "react-icons/fa";
import { TbLogout, TbMessage, TbChevronDown } from "react-icons/tb";

const UserMenu = ({ user }) => {
  const dispatch = useDispatch();
  const { classes, theme, cx } = useStyles();
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const logoutHandler = async () => {
    await dispatch(logout());
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
            {/* User's Avatar */}
            <Avatar src={user.avatar} alt={user.avatar} radius="xl" size={20} />
            {/* User name */}
            <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
              {user.username}
            </Text>
            <TbChevronDown size={12} />
          </Group>
        </UnstyledButton>
      }
    >
      <Menu.Label>Your Legacy</Menu.Label>
      <Menu.Item
        component={Link}
        to="likes"
        icon={<FaHeart size={14} color={theme.colors.red[6]} />}
      >
        Liked posts
      </Menu.Item>
      <Menu.Item
        component={Link}
        to="comments"
        icon={<TbMessage size={16} color={theme.colors.blue[6]} />}
      >
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
