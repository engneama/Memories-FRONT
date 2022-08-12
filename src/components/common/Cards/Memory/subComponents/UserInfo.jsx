//Components
import Moment from "react-moment";
//UI Components
import { Group, Avatar, Text } from "@mantine/core";

const UserInfo = ({ styles, URL, username, time }) => {
  return (
    <Group className={styles}>
      <Avatar src={URL} radius="sm" />
      <div>
        <Text>{username}</Text>
        <Text size="xs">
          <Moment fromNow interval={60000}>
            {time}
          </Moment>
        </Text>
      </div>
    </Group>
  );
};

export default UserInfo;
