import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";

interface Props {
  children: string;
  checked: boolean;
  onClick(): void;
}

export default function ToggleButton({
  children,
  checked = false,
  onClick,
}: Props) {
  return (
    <Flex mt="1">
      <Button
        size="xs"
        fontWeight="light"
        color="blue.900"
        border="none"
        bgColor={checked ? "blue.100" : "transparent"}
        onClick={onClick}
      >
        {children}
      </Button>
    </Flex>
  );
}
