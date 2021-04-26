import Head from "next/head";
import React, { useEffect, useMemo, useState } from "react";
import { SearchData, Upon } from "@common/types";
import { Flex, Text } from "@chakra-ui/layout";
import Search from "@components/Search";
import { getItems, getFiltersFromDataResult } from "../common/functions";
import Filters from "../components/Filter";
import Results from "../components/Results";
import History from "@components/History";
import { throttle } from "lodash";
import { useSearchContext } from "../contexts/searchValue";

export interface BonusFilter {
  type: string;
  checked: boolean;
}

export interface BonusFilterOptions {
  upon: Upon;
  checked: boolean;
}

export interface BonusFilterWithUpon {
  type: string;
  options: BonusFilterOptions[];
}

export interface SortBy {
  type: string;
  isAsc: boolean;
}

export default function Template() {
  const [data, setData] = useState<SearchData>(null);
  const [dataFiltered, setDataFiltered] = useState<SearchData>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [bonusFilters, setFilters] = useState<BonusFilter[]>([]);
  const [bonusFiltersWithUpon, setFiltersWithUpon] = useState<
    BonusFilterWithUpon[]
  >([]);
  const [sortBy, setSortBy] = useState<SortBy>({ type: "price", isAsc: true });
  const { updateSearchHistory } = useSearchContext();

  const handleOnSearch = throttle(
    async (value: string) => {
      setSortBy({ type: "price", isAsc: true });
      setIsFetching(true);
      const data = await getItems(value);
      if (!data) return;
      setData({
        ...data,
        results: data.results.sort((a, b) => a.item.price - b.item.price),
      });
      setIsFetching(false);
      updateSearchHistory(value);
    },
    2000,
    { trailing: false, leading: true }
  );

  function handleBonusFilterToggle(filter: BonusFilter) {
    setFilters(
      bonusFilters.map((f) =>
        f.type === filter.type ? { type: f.type, checked: !f.checked } : f
      )
    );
  }

  function handleBonusFilterWithUponToggle(filter: string, option: string) {
    setFiltersWithUpon(
      bonusFiltersWithUpon.map((bonus) =>
        bonus.type === filter
          ? {
              type: bonus.type,
              options: bonus.options.map((opt) =>
                opt.upon === option
                  ? { ...opt, checked: !opt.checked }
                  : { ...opt, checked: false }
              ),
            }
          : bonus
      )
    );
  }

  function handleFiltersReset() {
    setFilters(bonusFilters.map((bonus) => ({ ...bonus, checked: false })));
    setFiltersWithUpon(
      bonusFiltersWithUpon.map((bonus) => ({
        ...bonus,
        options: bonus.options.map((option) => ({
          upon: option.upon,
          checked: false,
        })),
      }))
    );
  }

  function handleSortChange(type: string) {
    const isAsc = sortBy.type === type ? !sortBy.isAsc : true;
    setSortBy({ type, isAsc });
  }

  const hasFilters = useMemo(() => {
    return !!bonusFilters.length || !!bonusFiltersWithUpon.length;
  }, [bonusFilters, bonusFiltersWithUpon]);

  const hasBonus = useMemo(
    () => data?.results.some((result) => result.item.bonus.length > 0),
    [data]
  );

  useEffect(() => {
    if (!data) return;
    const filters = getFiltersFromDataResult(data);

    setFiltersWithUpon(
      filters
        .filter((bonus) => bonus?.upon)
        .map((bonus) => ({
          type: bonus.type,
          options: bonus.upon.map((upon: string) => ({
            upon,
            checked: false,
          })),
        }))
    );
    setFilters(
      filters
        .filter((bonus) => !bonus?.upon)
        .map((bonus) => ({ type: bonus.type, checked: false }))
    );
  }, [data]);

  // Filter data
  useEffect(() => {
    if (!hasFilters) {
      setDataFiltered(data);
      return;
    }

    const filtered = data.results.filter((result) =>
      bonusFilters
        .filter((filter) => filter.checked)
        .map((filter) => filter.type)
        .every((filter) =>
          result.item.bonus.some((bonus) => bonus.type === filter)
        )
    );

    const final = filtered.filter((result) =>
      bonusFiltersWithUpon
        .filter((filter) => filter.options.find((opt) => opt.checked))
        .every((filter) =>
          result.item.bonus.some(
            (bonus) =>
              bonus.type === filter.type &&
              filter.options.some((f) => f.upon === bonus.upon && f.checked)
          )
        )
    );

    setDataFiltered({
      ...data,
      total: final.length,
      results: final,
    });
  }, [bonusFilters, bonusFiltersWithUpon]);

  useEffect(() => {
    if (!dataFiltered) return;

    if (sortBy.type === "price") {
      setDataFiltered({
        ...dataFiltered,
        results: dataFiltered.results.sort((a, b) =>
          sortBy.isAsc
            ? a.item.price - b.item.price
            : b.item.price - a.item.price
        ),
      });
      return;
    }

    const sorted = dataFiltered.results.sort((resA, resB) => {
      const a = resA.item.bonus.find((bonus) => bonus.type === sortBy.type)
        ?.value;
      const b = resB.item.bonus.find((bonus) => bonus.type === sortBy.type)
        ?.value;

      if (!b || !a) {
        return -9999;
      }

      return sortBy.isAsc ? b - a : a - b;
    });

    setDataFiltered({ ...dataFiltered, results: sorted });
  }, [sortBy]);

  return (
    <Flex w="full" justifyContent="center" bgColor="gray.100">
      <Head>
        <title>Ragnawave Market</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      <Flex as="main" w={["full"]}>
        <Filters
          hasFilters={hasFilters}
          filters={bonusFilters}
          filtersWithUpon={bonusFiltersWithUpon}
          onFilterCheck={handleBonusFilterToggle}
          onFilterWithUponCheck={handleBonusFilterWithUponToggle}
          onReset={handleFiltersReset}
        />

        <Flex direction="column" w="full" pl="8" pr="2" h="100vh">
          <Flex minH="16" alignItems="center" userSelect="none">
            <Flex mr="2" direction="column" alignItems="flex-end">
              <Text
                size="sm"
                fontWeight="semibold"
                color="blue.500"
                lineHeight="1"
              >
                RAGNAWAVE
              </Text>
              <Text
                fontSize="x-small"
                textTransform="uppercase"
                fontWeight="semibold"
                letterSpacing="2px"
                color="gray.500"
              >
                Mercado
              </Text>
            </Flex>
            <Search isFetching={isFetching} onSubmit={handleOnSearch} />
          </Flex>
          <Flex mb="4">
            <Results
              data={dataFiltered}
              hasBonus={hasBonus}
              onSortChange={handleSortChange}
              sortBy={sortBy}
              onItemPress={(value) => handleOnSearch(value)}
            />

            <History onHistoryPress={(value) => handleOnSearch(value)} />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
