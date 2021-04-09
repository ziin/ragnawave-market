import { Box, Flex, Heading } from "@chakra-ui/layout";
import { BonusFilter } from "@pages";
import ToggleButton from "./ToggleButton";

interface Props {
  filters: BonusFilter[];
  onFilterCheck(filter: BonusFilter): void;
}

export default function BonusFilters({ filters, onFilterCheck }: Props) {
  return (
    <Box>
      {!!filters.length && (
        <Heading textTransform="uppercase" fontSize="x-small">
          Bônus
        </Heading>
      )}
      <Flex direction="column">
        {filters.map((filter, i) => (
          <Flex key={i}>
            <ToggleButton
              checked={filter.checked}
              onClick={() => onFilterCheck(filter)}
            >
              {filter.type}
            </ToggleButton>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
}
