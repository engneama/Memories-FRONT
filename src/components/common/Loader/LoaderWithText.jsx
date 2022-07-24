import { Loader, Stack, Text } from "@mantine/core";

const LoaderWithText = () => {
  return (
    <Stack align="center">
      <Loader size="xl" />

      <Text size="xl">Loading...</Text>
    </Stack>
  );
};

export default LoaderWithText;
