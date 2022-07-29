import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  section: {
    width: 600,
    maxWidth: 600,
    minWidth: 600,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },

  title: {
    fontWeight: 900,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  paper: {
    borderRadius: theme.radius.md,
    padding: 30,
    marginTop: 30,
    boxShadow: theme.shadows.md,
  },
}));
