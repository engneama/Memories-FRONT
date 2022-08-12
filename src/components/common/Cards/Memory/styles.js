import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme, _params, getRef) => ({
  card: {
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.md,

    [`&:hover .${getRef("cover")}`]: {
      transform: "scale(1.1)",
    },
  },

  coverWrapper: {
    position: "relative",
    overflow: "hidden",
  },

  cover: {
    transition: "all .5s ease",
    ref: getRef("cover"),
  },

  overlay: {
    position: "absolute",
    top: "20%",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage:
      theme.colorScheme === "dark"
        ? "linear-gradient(180deg, rgba(37,38,43,0) 40%, rgba(37,38,43,0.5) 70%, rgb(37, 38, 43) 100%)"
        : "linear-gradient(180deg, rgba(255,255,255,0) 40%, rgba(255,255,255,0.5) 70%, rgb(255, 255, 255) 100%)",
  },

  userInfo: {
    position: "absolute",
    top: "375px",
    left: theme.spacing.sm,
    pointerEvents: "none",
  },

  badge: {
    position: "absolute",
    top: "10px",
    right: "12px",
    pointerEvents: "none",
    backgroundColor: "transparent",
  },

  likes: {
    color: theme.colorScheme === "dark" && "white",
  },

  tags: {
    wordBreak: "break-word",
  },

  buttons: {
    display: "flex",
    gap: theme.spacing.xs,
  },
}));
