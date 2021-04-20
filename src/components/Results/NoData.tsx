import { Flex, Text } from "@chakra-ui/layout";

export default function NoData() {
  return (
    <Flex w="600px" pl="28">
      <Text color="blue.800" fontSize="sm">
        Esperando sua consulta... 😎
      </Text>
    </Flex>
  );
}
