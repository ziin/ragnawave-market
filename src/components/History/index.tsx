import { Flex, List, Text, ListItem } from "@chakra-ui/layout";
import { useSearchContext } from "@contexts/searchValue";

interface Props {
  onHistoryPress(value: string): void;
}
export default function History({ onHistoryPress }: Props) {
  const { searchValue, searchHistory } = useSearchContext();
  return (
    <Flex direction="column" ml="2" alignItems="flex-end">
      <Text
        fontWeight="semibold"
        fontSize="small"
        color="gray.600"
        letterSpacing="2px"
      >
        Histórico
      </Text>
      <List spacing={-1}>
        {searchHistory.map((hist) => (
          <ListItem
            maxW="200px"
            key={hist}
            cursor="pointer"
            onClick={() => onHistoryPress(hist)}
            textAlign="end"
            fontSize="small"
            color={searchValue === hist ? "blue.400" : "gray.900"}
            fontWeight={searchValue === hist ? "semibold" : "gray.900"}
            letterSpacing="0.4px"
            isTruncated
          >
            {hist}
          </ListItem>
        ))}
      </List>
    </Flex>
  );
}
