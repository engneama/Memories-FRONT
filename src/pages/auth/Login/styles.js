import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  section: {
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },

  title: {
    fontWeight: 900,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  paper: {
    width: "23em",
    borderRadius: theme.radius.md,
    padding: 30,
    marginTop: 30,
    boxShadow: theme.shadows.md,
  },
}));
