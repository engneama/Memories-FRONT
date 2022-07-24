import { Link } from "react-router-dom";
import { Image, Text, Box, useMantineColorScheme } from "@mantine/core";
import { Logo } from "configs";

const TextLogo = () => {
  const { colorScheme } = useMantineColorScheme();

  return (
    <Box component={Link} to="/">
      <Image
        src={colorScheme === "dark" ? Logo.textWhite : Logo.text}
        alt={Logo.text}
        width="8em"
        withPlaceholder
        placeholder={<Text align="center">Memories text logo</Text>}
      />
    </Box>
  );
};

export default TextLogo;
