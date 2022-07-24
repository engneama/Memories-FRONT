import { showNotification } from "@mantine/notifications";

const PendingNoti = (id, title, message) => {
  return showNotification({
    id,
    title,
    message,
    loading: true,
  });
};

export default PendingNoti;
