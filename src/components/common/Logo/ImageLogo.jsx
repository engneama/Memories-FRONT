import { Link } from "react-router-dom";
import { Image, Text, Box } from "@mantine/core";
import { Logo } from "configs";

const ImageLogo = () => {
  return (
    <Box component={Link} to="/">
      <Image
        src={Logo.img}
        alt={Logo.img}
        ml="lg"
        mr="xs"
        width="2.25em"
        withPlaceholder
        placeholder={<Text align="center">Memories image logo</Text>}
      />
    </Box>
  );
};

export default ImageLogo;
