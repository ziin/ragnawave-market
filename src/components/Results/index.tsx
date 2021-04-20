import { Flex, List, ListItem, UnorderedList, Text } from "@chakra-ui/layout";
import { Table, Tbody, Th, Thead, Tr, Td } from "@chakra-ui/table";
import { FcNumericalSorting12, FcNumericalSorting21 } from "react-icons/fc";
import { formatPrice, getPriceColor } from "@common/functions";
import { SearchData } from "@common/types";
import ItemImage from "../ItemImage";
import NoData from "./NoData";
import NoResults from "./NoResults";
import { SortBy } from "@pages";
import { useSearchContext } from "@contexts/searchContext";

interface Props {
  data: SearchData;
  hasBonus: boolean;
  onSortChange(type: string): void;
  sortBy: SortBy;
}
export default function Results({
  data,
  hasBonus,
  onSortChange,
  sortBy,
}: Props) {
  const { updateValue } = useSearchContext();

  function handleItemClick(value: string) {
    updateValue(value.replace(/^(\+[0-9]+)/, "").trim());
  }

  if (!data) {
    return <NoData />;
  }
  if (data && !data.results.length) {
    return <NoResults />;
  }
  return (
    <Table variant="striped" colorScheme="facebook" size="sm">
      <Thead>
        <Tr cursor="default">
          <Th w="4" isNumeric>
            Qnt
          </Th>
          <Th>Item</Th>
          {hasBonus && <Th>Bônus</Th>}
          <Th isNumeric cursor="pointer" onClick={() => onSortChange("price")}>
            <Flex>
              <Text>Preço</Text>
              {sortBy.type === "price" && sortBy.isAsc ? (
                <FcNumericalSorting12 size={18} />
              ) : sortBy.type === "price" && !sortBy.isAsc ? (
                <FcNumericalSorting21 size={18} />
              ) : null}
            </Flex>
          </Th>
          <Th>Vendedor</Th>
        </Tr>
      </Thead>
      <Tbody borderX="1px solid #F9FAFC">
        {data &&
          data.results.map(({ item, location, vendorName }, index) => (
            <Tr verticalAlign="top" key={index} cursor="default">
              <Td isNumeric>{item.amount}</Td>
              <Td>
                <Flex alignItems="center">
                  <ItemImage
                    id={item.id}
                    alt={item.name}
                    isCard={item.name.startsWith("Carta")}
                  />

                  <Text
                    onClick={() => handleItemClick(item.name)}
                    cursor="pointer"
                    _hover={{ fontWeight: "semibold" }}
                  >
                    {item.name}
                  </Text>
                </Flex>
                <UnorderedList listStyleType="none">
                  {item.cards &&
                    item.cards.map((card, i) => (
                      <ListItem key={i} lineHeight="3">
                        <Flex alignItems="center">
                          <ItemImage
                            isCard
                            id={card.card_id}
                            alt={card.card_name}
                            size={18}
                          />
                          <Text fontSize="small" wordBreak="keep-all">
                            {card.card_name}
                          </Text>
                        </Flex>
                      </ListItem>
                    ))}
                </UnorderedList>
              </Td>
              {hasBonus && (
                <Td>
                  <List>
                    {item.bonus.map((bonus, i) => (
                      <ListItem
                        key={i}
                        fontSize="13"
                        cursor="pointer"
                        _hover={{ fontWeight: "bold" }}
                        color={
                          sortBy.type === bonus.type ? "blue.600" : "gray.800"
                        }
                        onClick={() => onSortChange(bonus.type)}
                      >
                        {bonus.raw}
                      </ListItem>
                    ))}
                  </List>
                </Td>
              )}
              <Td isNumeric maxW="140px">
                <Text fontWeight="500" color={getPriceColor(item.price)}>
                  {`${formatPrice(item.price)}z`}
                </Text>
              </Td>
              <Td>
                <Flex direction="column" justifyContent="center">
                  <Text fontSize="small" color="gray.600" fontWeight="semibold">
                    {vendorName}
                  </Text>
                  <Text fontSize="small">/navi {location}</Text>
                </Flex>
              </Td>
            </Tr>
          ))}
      </Tbody>
    </Table>
  );
}
