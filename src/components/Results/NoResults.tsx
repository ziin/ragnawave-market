import { Box, Text } from "@chakra-ui/layout";

export default function NoResults() {
  return (
    <Box pl="28">
      <Text color="blue.800" fontSize="sm">
        Nada encontrando... 🤔
      </Text>
    </Box>
  );
}
