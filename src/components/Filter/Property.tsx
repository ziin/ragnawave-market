import { Tag } from "@chakra-ui/tag";
import { PropertyType } from "@common/filters";

interface Props {
  children: string;
  isSelected: boolean;
  value: PropertyType | "";
  onClick(value: PropertyType | ""): void;
}
export default function Property({
  children,
  isSelected,
  value,
  onClick,
}: Props) {
  return (
    <Tag
      size="sm"
      cursor="pointer"
      mr="1"
      userSelect="none"
      mt="1"
      bgColor={isSelected ? "blue.500" : "blue.100"}
      color={isSelected ? "white" : "blue.900"}
      onClick={() => onClick(value)}
    >
      {children}
    </Tag>
  );
}
