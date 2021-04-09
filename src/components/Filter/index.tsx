import { Button } from "@chakra-ui/button";
import { Box, Center, Flex, Heading, Text } from "@chakra-ui/layout";
import { BonusFilter, BonusFilterWithUpon } from "../../pages";
import BonusFilters from "./BonusFilters";
import BonusFiltersWithUpon from "./BonusFiltersWithUpon";

interface Props {
  hasFilters: boolean;
  filters: BonusFilter[];
  onFilterCheck(filter: BonusFilter): void;
  filtersWithUpon: BonusFilterWithUpon[];
  onFilterWithUponCheck(filter: string, option: string): void;
  onReset(): void;
}

export default function Filters({
  hasFilters,
  filters,
  filtersWithUpon,
  onFilterCheck,
  onFilterWithUponCheck,
  onReset,
}: Props) {
  return (
    <Flex direction="column" w="56" pr="2" pl={[1, 2]}>
      {hasFilters && (
        <>
          <Flex
            h="10"
            alignItems="flex-end"
            justifyContent="space-between"
            mb="4"
          >
            <Heading size="sm">Filtros</Heading>
            <Button size="xs" variant="link" onClick={onReset}>
              Limpar
            </Button>
          </Flex>

          <BonusFilters filters={filters} onFilterCheck={onFilterCheck} />

          <BonusFiltersWithUpon
            filters={filtersWithUpon}
            onFilterCheck={onFilterWithUponCheck}
          />
        </>
      )}
    </Flex>
  );
}
