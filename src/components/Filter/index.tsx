import { Button } from "@chakra-ui/button";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import {
  Elements,
  PropertyType,
  Races,
  SelectFilter,
  SelectType,
  ToggleFilter,
  ToggleType,
} from "@common/filters";
import Checkbox from "@components/Filter/CheckBox";
import SelectProperty from "@components/Filter/SelectProperty";

interface Props {
  filters: ToggleFilter[];
  selects: SelectFilter[];
  handleFilterChange(key: ToggleType): void;
  handleSelectChange(key: SelectType, value: PropertyType): void;
  clearFilters(): void;
}
export default function Filter({
  filters,
  selects,
  handleFilterChange,
  handleSelectChange,
  clearFilters,
}: Props) {
  function handleSelectedProperty(key: SelectType) {
    const found = selects.find((select) => select.key === key);
    return found ? found.value : "";
  }

  return (
    <Flex direction="column" paddingX="4" w="full">
      <Flex w="full" h="20" justifyContent="space-between" alignItems="center">
        <Heading>Filtros</Heading>
        <Button
          variant="ghost"
          size="sm"
          colorScheme="blue"
          onClick={clearFilters}
        >
          Limpar
        </Button>
      </Flex>

      <Box marginY="2">
        <Text fontSize="xs" fontWeight="bold" textTransform="uppercase">
          Status
        </Text>

        <Flex wrap="wrap">
          {filters.map((filter) => (
            <Checkbox
              key={filter.key}
              label={filter.label}
              onClick={() => handleFilterChange(filter.key)}
              checked={filter.active}
            />
          ))}
        </Flex>
      </Box>

      <Box marginY="2">
        <Text fontSize="xs" fontWeight="bold" textTransform="uppercase">
          Aumento de dano físico na Raça
        </Text>
        <Text fontSize="x-small" fontWeight="light">
          Somente em Armas de dano físico
        </Text>
        <SelectProperty
          name={SelectType.ATK_RACE}
          onChange={handleSelectChange}
          selected={handleSelectedProperty(SelectType.ATK_RACE)}
          options={[
            { label: "Morto-Vivo", property: Races.mortovivo },
            { label: "Humanóide", property: Races.humanoide },
            { label: "Amorfo", property: Races.amorfo },
            { label: "Planta", property: Races.planta },
            { label: "Demônio", property: Races.demonio },
            { label: "Inseto", property: Races.inseto },
            { label: "Anjo", property: Races.anjo },
            { label: "Peixe", property: Races.peixe },
            { label: "Dragão", property: Races.dragao },
          ]}
        />
      </Box>

      <Box marginY="2">
        <Text fontSize="xs" fontWeight="bold" textTransform="uppercase">
          Ignorar defesa física na raça
        </Text>
        <Text fontSize="x-small" fontWeight="light">
          Somente em Armas de dano físico
        </Text>
        <SelectProperty
          name={SelectType.IGNORE_DEF_RACE}
          onChange={handleSelectChange}
          selected={handleSelectedProperty(SelectType.IGNORE_DEF_RACE)}
          options={[
            { label: "Morto-Vivo", property: Races.mortovivo },
            { label: "Humanóide", property: Races.humanoide },
            { label: "Amorfo", property: Races.amorfo },
            { label: "Planta", property: Races.planta },
            { label: "Demônio", property: Races.demonio },
            { label: "Inseto", property: Races.inseto },
            { label: "Anjo", property: Races.anjo },
            { label: "Peixe", property: Races.peixe },
            { label: "Dragão", property: Races.dragao },
          ]}
        />
      </Box>

      <Box marginY="2">
        <Text fontSize="xs" fontWeight="bold" textTransform="uppercase">
          Aumento de dano ao Elemento
        </Text>
        <Text fontSize="x-small" fontWeight="light">
          Somente em armas craftadas
        </Text>

        <SelectProperty
          name={SelectType.ATK_ELEMENT}
          onChange={handleSelectChange}
          selected={handleSelectedProperty(SelectType.ATK_ELEMENT)}
          options={[
            { label: "Fogo", property: Elements.fogo },
            { label: "Terra", property: Elements.terra },
            { label: "Agua", property: Elements.agua },
            { label: "Vento", property: Elements.vento },
            { label: "Fantasma", property: Elements.fantasma },
            { label: "Sagrado", property: Elements.sagrado },
            { label: "Sombrio", property: Elements.sombrio },
            { label: "Maldito", property: Elements.maldito },
            { label: "Veneno", property: Elements.veneno },
            { label: "Neutro", property: Elements.neutro },
          ]}
        />
      </Box>

      <Box marginY="2">
        <Text fontSize="xs" fontWeight="bold" textTransform="uppercase">
          Ignorar Defesa Mágica a Raça
        </Text>
        <Text fontSize="x-small" fontWeight="light">
          Somente Cajados e Livros
        </Text>

        <SelectProperty
          name={SelectType.IGNORE_DEFM_RACE}
          onChange={handleSelectChange}
          selected={handleSelectedProperty(SelectType.IGNORE_DEFM_RACE)}
          options={[
            { label: "Morto-Vivo", property: Races.mortovivo },
            { label: "Humanóide", property: Races.humanoide },
            { label: "Amorfo", property: Races.amorfo },
            { label: "Planta", property: Races.planta },
            { label: "Demônio", property: Races.demonio },
            { label: "Inseto", property: Races.inseto },
            { label: "Anjo", property: Races.anjo },
            { label: "Peixe", property: Races.peixe },
            { label: "Dragão", property: Races.dragao },
          ]}
        />
      </Box>

      <Box marginY="2">
        <Text fontSize="xs" fontWeight="bold" textTransform="uppercase">
          Defesa contra a raça
        </Text>
        <Text fontSize="x-small" fontWeight="light">
          Somente Escudos
        </Text>

        <SelectProperty
          name={SelectType.DEF_RACE}
          onChange={handleSelectChange}
          selected={handleSelectedProperty(SelectType.DEF_RACE)}
          options={[
            { label: "Morto-Vivo", property: Races.mortovivo },
            { label: "Humanóide", property: Races.humanoide },
            { label: "Amorfo", property: Races.amorfo },
            { label: "Planta", property: Races.planta },
            { label: "Demônio", property: Races.demonio },
            { label: "Inseto", property: Races.inseto },
            { label: "Anjo", property: Races.anjo },
            { label: "Peixe", property: Races.peixe },
            { label: "Dragão", property: Races.dragao },
          ]}
        />
      </Box>

      <Box marginY="2">
        <Text fontSize="xs" fontWeight="bold" textTransform="uppercase">
          Defesa Mágica ao Elemento
        </Text>
        <Text fontSize="x-small" fontWeight="light">
          Somente Capas
        </Text>
        <SelectProperty
          name={SelectType.DEF_ELEMENT}
          onChange={handleSelectChange}
          selected={handleSelectedProperty(SelectType.DEF_ELEMENT)}
          options={[
            { label: "Fogo", property: Elements.fogo },
            { label: "Terra", property: Elements.terra },
            { label: "Agua", property: Elements.agua },
            { label: "Vento", property: Elements.vento },
            { label: "Fantasma", property: Elements.fantasma },
            { label: "Sagrado", property: Elements.sagrado },
            { label: "Sombrio", property: Elements.sombrio },
            { label: "Maldito", property: Elements.maldito },
            { label: "Veneno", property: Elements.veneno },
            { label: "Neutro", property: Elements.neutro },
          ]}
        />
      </Box>
    </Flex>
  );
}
