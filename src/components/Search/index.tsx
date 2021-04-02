import { Button } from "@chakra-ui/button";
import { FormControl } from "@chakra-ui/form-control";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { Flex } from "@chakra-ui/layout";
import { FormEvent, useRef } from "react";
import { BiSearch } from "react-icons/bi";

interface Props {
  handleSubmit(value: string): void;
}
export default function Search({ handleSubmit }: Props) {
  const searchInput = useRef<HTMLInputElement>();

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleSubmit(searchInput.current.value);
  }

  return (
    <form onSubmit={onSubmit}>
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
            ref={searchInput}
          />
          <Button variant="solid" colorScheme="blue" type="submit" ml="2">
            Pesquisar
          </Button>
        </InputGroup>
      </Flex>
    </form>
  );
}
