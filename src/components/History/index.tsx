import { Flex, List, Text, ListItem } from "@chakra-ui/layout";
import { useSearchContext } from "../../contexts/searchContext";

export default function History() {
  const { value, history, updateValue } = useSearchContext();

  return (
    <Flex w="200px" direction="column" alignItems="flex-end">
      <Text
        fontWeight="semibold"
        fontSize="sm"
        color="gray.700"
        letterSpacing="2px"
      >
        Histórico
      </Text>
      <List spacing={0.2}>
        {history.map((hist) => (
          <ListItem
            key={hist}
            cursor="pointer"
            onClick={() => updateValue(hist)}
            textAlign="end"
            fontSize="sm"
            color={value === hist ? "blue.400" : "gray.900"}
            fontWeight={value === hist ? "semibold" : "gray.900"}
            letterSpacing="1px"
          >
            {hist}
          </ListItem>
        ))}
      </List>
    </Flex>
  );
}
