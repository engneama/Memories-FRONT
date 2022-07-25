import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  section: {
    marginTop: theme.spacing.lg,
  },

  title: {
    fontWeight: 900,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  paper: {
    padding: 30,
    marginTop: 30,
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.md,
  },
}));
