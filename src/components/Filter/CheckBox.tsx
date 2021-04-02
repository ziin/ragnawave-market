import { Tag, TagLabel } from "@chakra-ui/tag";

interface Props {
  label: string;
  checked: boolean;
  onClick(): void;
}

export default function Checkbox({ label, checked = false, onClick }: Props) {
  return (
    <Tag
      size="sm"
      cursor="pointer"
      mr="1"
      userSelect="none"
      mt="1"
      bgColor={checked ? "blue.500" : "blue.100"}
      color={checked ? "white" : "blue.900"}
      borderRadius="full"
      onClick={onClick}
    >
      <TagLabel>{label}</TagLabel>
    </Tag>
  );
}
