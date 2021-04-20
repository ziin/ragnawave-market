import { Button } from "@chakra-ui/button";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { Flex } from "@chakra-ui/layout";
import { FormEvent, useEffect, useRef } from "react";
import { BiSearch } from "react-icons/bi";
import { useSearchContext } from "@contexts/searchContext";
import throttle from "lodash.throttle";

interface Props {
  isFetching: boolean;
}
export default function Search({ isFetching }: Props) {
  const inputRef = useRef<HTMLInputElement>();
  const { updateValue, value } = useSearchContext();

  const handleOnSubmit = throttle(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const sanitized = inputRef.current.value.trim();
      updateValue(sanitized);
    },
    2000,
    { trailing: false, leading: true }
  );

  useEffect(() => {
    inputRef.current.value = value;
  }, [value]);

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
