import { Link } from "react-router-dom";
import { Image, Text, Box } from "@mantine/core";
import { Logo } from "configs";

const TextLogo = () => {
  return (
    <Box component={Link} to="/">
      <Image
        src={Logo.text}
        alt={Logo.text}
        width="8em"
        withPlaceholder
        placeholder={<Text align="center">Memories text logo</Text>}
      />
    </Box>
  );
};

export default TextLogo;
