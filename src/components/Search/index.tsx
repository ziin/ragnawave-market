import { Button } from "@chakra-ui/button";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { Flex } from "@chakra-ui/layout";
import { FormEvent, useEffect, useRef } from "react";
import { BiSearch } from "react-icons/bi";
import { useSearchContext } from "@contexts/searchValue";

interface Props {
  isFetching: boolean;
  onSubmit(value: string): void;
}
export default function Search({ isFetching, onSubmit }: Props) {
  const { searchValue, updateSearchValue } = useSearchContext();
  const inputRef = useRef<HTMLInputElement>();

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const sanitized = inputRef.current.value.trim();
    onSubmit(sanitized);
    updateSearchValue(sanitized);
  };

  useEffect(() => {
    inputRef.current.value = searchValue;
  }, [searchValue]);

  return (
    <form onSubmit={handleOnSubmit}>
      <Flex>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<BiSearch size={24} color="#9898B5" />}
          />
          <Input
            w="96"
            type="text"
            name="searchTerm"
            placeholder="Nome ou ID"
            bgColor="whiteAlpha.700"
            ref={inputRef}
          />
          <Button
            isLoading={isFetching}
            variant="solid"
            colorScheme="linkedin"
            type="submit"
            w="32"
            ml="2"
          >
            Pesquisar
          </Button>
        </InputGroup>
      </Flex>
    </form>
  );
}
