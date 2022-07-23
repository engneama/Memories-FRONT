import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { BsFillSunFill as Sun } from "react-icons/bs";
import { RiMoonClearFill as Moon } from "react-icons/ri";

const SwitchTheme = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  return (
    <ActionIcon
      variant="light"
      title="Toggle theme"
      aria-label="Toggle theme"
      color={dark ? "yellow" : "blue"}
      onClick={() => toggleColorScheme()}
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </ActionIcon>
  );
};

export default SwitchTheme;
