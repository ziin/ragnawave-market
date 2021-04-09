import { Button } from "@chakra-ui/button";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { Flex } from "@chakra-ui/layout";
import { FormEvent, MutableRefObject } from "react";
import { BiSearch } from "react-icons/bi";

interface Props {
  onSubmit(value: string): void;
  isFetching: boolean;
  inputRef: MutableRefObject<HTMLInputElement>;
}
export default function Search({ onSubmit, isFetching, inputRef }: Props) {
  function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(inputRef.current.value);
  }

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
