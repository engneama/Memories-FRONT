import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  cover: {
    maxWidth: "60vw",
    [`@media (max-width: ${theme.breakpoints.xl}px)`]: {
      maxWidth: "100vw",
    },
  },

  upperPart: {
    textAlign: "center",
    padding: "3% 0%",
  },

  title: {
    marginBottom: "0.7rem",
  },
}));
