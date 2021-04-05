import Head from "next/head";
import React, { useEffect, useMemo, useState } from "react";

import { SearchData } from "@common/types";
import { getItems } from "@common/functions";
import {
  ToggleFilter,
  ToggleType,
  SelectFilter,
  SelectType,
  getFilterTermForSelectedType,
  PropertyType,
} from "@common/filters";
import Filter from "@components/Filter";
import Search from "@components/Search";
import Results from "@components/Results";
import { Box, Flex, Heading, Stack } from "@chakra-ui/layout";
import Welcome from "@components/Welcome";
import ItemNotFound from "@components/ItemNotFound";

const defaultToggleFilters: ToggleFilter[] = [
  { key: ToggleType.ATQ, label: "ATQ", filter: "ATQ +", active: false },
  {
    key: ToggleType.PRECISAO,
    label: "Precisão",
    filter: "Precisão +",
    active: false,
  },
  {
    key: ToggleType.MATQ,
    label: "MATQ",
    filter: "MATQ +",
    active: false,
  },
  {
    key: ToggleType.HP,
    label: "HP",
    filter: "Máx. HP",
    active: false,
  },
  {
    key: ToggleType.SP,
    label: "SP",
    filter: "Máx. SP",
    active: false,
  },
  {
    key: ToggleType.HP_REGEN,
    label: "HP Regen.",
    filter: "Recuperação de HP",
    active: false,
  },
  {
    key: ToggleType.SP_REGEN,
    label: "SP Regen.",
    filter: "Recuperação de SP",
    active: false,
  },
  {
    key: ToggleType.CURA,
    label: "Cura",
    filter: "Aumenta a Cura de Habilidades",
    active: false,
  },

  {
    key: ToggleType.DEF,
    label: "DEF",
    filter: "DEF +",
    active: false,
  },
  {
    key: ToggleType.MDEF,
    label: "DEFM",
    filter: "DEFM +",
    active: false,
  },
  {
    key: ToggleType.CRIT,
    label: "Crítico",
    filter: "Taxa de Ataques Críticos",
    active: false,
  },
  {
    key: ToggleType.ASPD,
    label: "Velocidade de Ataque",
    filter: "Velocidade de Ataque",
    active: false,
  },

  {
    key: ToggleType.FOR,
    label: "FOR",
    filter: "FOR +",
    active: false,
  },
  {
    key: ToggleType.VIT,
    label: "VIT",
    filter: "VIT +",
    active: false,
  },
  {
    key: ToggleType.AGI,
    label: "AGI",
    filter: "AGI +",
    active: false,
  },
  {
    key: ToggleType.INT,
    label: "INT",
    filter: "INT +",
    active: false,
  },
  {
    key: ToggleType.DES,
    label: "DES",
    filter: "DES +",
    active: false,
  },
  {
    key: ToggleType.SOR,
    label: "SOR",
    filter: "SOR +",
    active: false,
  },
  {
    key: ToggleType.CONJ_DELAY,
    label: "Reduz Pós-Conjuração",
    filter: "Reduz o tempo do atraso",
    active: false,
  },
  {
    key: ToggleType.DANO_DIST,
    label: "Dano a Distância",
    filter: "Aumenta o ATK a distância",
    active: false,
  },
  {
    key: ToggleType.CONJ_TIME,
    label: "Redução de Lançamento",
    filter: "Reduz o tempo de lançamento",
    active: false,
  },

  {
    key: ToggleType.INDESTRUCT,
    label: "Indestrutível",
    filter: "Indestrutível em batalha",
    active: false,
  },
];

const defaultSelectFilters: SelectFilter[] = [
  {
    key: SelectType.ATK_RACE,
    selected: false,
    value: "",
  },
  {
    key: SelectType.ATK_ELEMENT,
    selected: false,
    value: "",
  },
  {
    key: SelectType.IGNORE_DEF_RACE,
    selected: false,
    value: "",
  },
  {
    key: SelectType.IGNORE_DEFM_RACE,
    selected: false,
    value: "",
  },
  {
    key: SelectType.DEF_RACE,
    selected: false,
    value: "",
  },
  {
    key: SelectType.DEF_ELEMENT,
    selected: false,
    value: "",
  },
];

export default function Template() {
  const [data, setData] = useState<SearchData | null>(null);
  const [dataFiltered, setDataFiltered] = useState<SearchData | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filters, setFilters] = useState<ToggleFilter[]>(defaultToggleFilters);
  const [selects, setSelects] = useState<SelectFilter[]>(defaultSelectFilters);

  function handleSubmit(value: string) {
    setSearchTerm(value.trim());
  }

  function handleFilterChange(key: ToggleType) {
    setFilters(
      filters.map((filter) =>
        filter.key === key ? { ...filter, active: !filter.active } : filter
      )
    );
  }

  function handleSelectChange(key: SelectType, value: PropertyType) {
    const currentSelected = selects.find((select) => select.key === key).value;
    setSelects(
      selects.map((select) =>
        select.key === key
          ? {
              key,
              selected: currentSelected !== value,
              value: currentSelected === value ? "" : value,
            }
          : select
      )
    );
  }

  function handleClearFilters() {
    setSelects(defaultSelectFilters);
    setFilters(defaultToggleFilters);
  }

  // Check if results has some bonuses
  const hasBonus = useMemo(
    () => data?.results.some((result) => result.item.options.length > 0),
    [dataFiltered]
  );

  // Filtering
  useEffect(() => {
    if (data) {
      const filteredByToggles = data.results.filter((result) => {
        return filters
          .filter((filter) => filter.active)
          .map((filter) => filter.filter)
          .every((value) =>
            result.item.options.some((bonus) => bonus.includes(value))
          );
      });

      const filtered = filteredByToggles.filter((result) => {
        return selects
          .filter((select) => select.selected)
          .map((select) =>
            getFilterTermForSelectedType(
              select.key,
              select.value as PropertyType
            )
          )
          .every((value) =>
            result.item.options.some((bonus) => bonus.includes(value))
          );
      });

      const sortedByPrice = filtered.sort(
        (resultA, resultB) => resultA.item.price - resultB.item.price
      );

      setDataFiltered({
        ...data,
        total: sortedByPrice.length,
        results: sortedByPrice,
      });
    }
  }, [data, filters, selects]);

  // Request when query.name change
  useEffect(() => {
    async function doRequest() {
      const items = await getItems(searchTerm);
      setData(items || null);
    }

    if (searchTerm.length > 0) {
      doRequest();
    }
  }, [searchTerm]);

  return (
    <Flex h="full" w="full">
      <Head>
        <title>Ragnawave Market</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      <Flex w={400} h="100vh" bgColor="blackAlpha.100" overflowX="scroll">
        <Filter
          filters={filters}
          selects={selects}
          handleFilterChange={handleFilterChange}
          handleSelectChange={handleSelectChange}
          clearFilters={handleClearFilters}
        />
      </Flex>

      <Box w="full" h="100vh" overflowX="scroll" paddingX="8">
        <Stack marginY="4" spacing="4">
          <Heading>Pesquisar</Heading>
          <Search handleSubmit={handleSubmit} />
        </Stack>
        <Box>
          {!!!dataFiltered ? (
            <Welcome />
          ) : !!dataFiltered?.results.length ? (
            <Results data={dataFiltered} hasBonus={hasBonus} />
          ) : (
            <ItemNotFound />
          )}
        </Box>
      </Box>
    </Flex>
  );
}
