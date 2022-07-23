import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  hideOnMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
}));
