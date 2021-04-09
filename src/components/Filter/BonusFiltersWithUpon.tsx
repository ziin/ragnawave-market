import { Box, Flex, Heading } from "@chakra-ui/layout";
import { BonusFilterWithUpon } from "@pages";
import ToggleButton from "./ToggleButton";

interface Props {
  filters: BonusFilterWithUpon[];
  onFilterCheck(filter: string, option: string): void;
}

export default function BonusFiltersWithUpon({
  filters,
  onFilterCheck,
}: Props) {
  return (
    <Box>
      {filters.map((filter, i) => (
        <Box key={i} marginY="4">
          <Heading textTransform="uppercase" fontSize="x-small">
            {filter.type}
          </Heading>

          <Flex direction="column">
            {filter.options.map((option, i) => (
              <Flex key={i}>
                <ToggleButton
                  checked={option.checked}
                  onClick={() => onFilterCheck(filter.type, option.upon)}
                >
                  {option.upon}
                </ToggleButton>
              </Flex>
            ))}
          </Flex>
        </Box>
      ))}
    </Box>
  );
}
