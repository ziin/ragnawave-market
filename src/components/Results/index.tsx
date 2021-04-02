import { Flex, List, ListItem, UnorderedList } from "@chakra-ui/layout";
import { Table, Tbody, Th, Thead, Tr, Td } from "@chakra-ui/table";
import { formatPrice, getPriceColor } from "@common/functions";
import { SearchData } from "@common/types";
import ItemImage from "../ItemImage";

interface Props {
  data: SearchData;
  hasBonus: boolean;
}
export default function Results({ data, hasBonus }: Props) {
  return (
    <Table variant="striped" size="sm">
      <Thead>
        <Tr>
          <Th w="4">Qnt</Th>
          <Th>Item</Th>
          {hasBonus && <Th>Bônus</Th>}
          <Th>/navi</Th>
          <Th>Preço</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data &&
          data.results.map(({ item, location }, index) => (
            <Tr verticalAlign="top" key={index}>
              <Td>{item.amount}</Td>
              <Td>
                <Flex alignItems="center">
                  <ItemImage
                    id={item.nameid}
                    alt={item.name}
                    isCard={item.name.startsWith("Carta")}
                  />
                  {item.name}
                </Flex>
                <UnorderedList listStyleType="none">
                  {item.cards &&
                    item.cards.map((card, i) => (
                      <ListItem key={i} lineHeight="0">
                        <Flex alignItems="center" fontSize="small">
                          <ItemImage
                            isCard
                            id={card.card_id}
                            alt={card.card_name}
                            size={18}
                          />
                          {card.card_name}
                        </Flex>
                      </ListItem>
                    ))}
                </UnorderedList>
              </Td>
              {hasBonus && (
                <Td>
                  <List>
                    {item.options.map((bonus, i) => (
                      <ListItem key={i}>{bonus}</ListItem>
                    ))}
                  </List>
                </Td>
              )}
              <Td>{location}</Td>
              <Td fontWeight="semibold" color={getPriceColor(item.price)}>
                {formatPrice(item.price)}
              </Td>
            </Tr>
          ))}
      </Tbody>
    </Table>
  );
}
