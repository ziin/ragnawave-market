import React from "react";
import Property from "./Property";
import { PropertyType, SelectType, LabelledProperty } from "@common/filters";
import { Flex, Stack } from "@chakra-ui/layout";

interface Props {
  name: SelectType;
  selected: PropertyType;
  options: LabelledProperty<PropertyType>[];
  onChange(key: SelectType, property: PropertyType): void;
}

export default function SelectProperty({
  name,
  onChange,
  selected,
  options,
}: Props) {
  function onSelect(value: PropertyType) {
    onChange(name, value);
  }

  return (
    <Flex wrap="wrap">
      {options.map((option) => (
        <Property
          key={option.property}
          value={option.property}
          isSelected={selected === option.property}
          onClick={() => onSelect(option.property)}
        >
          {option.label}
        </Property>
      ))}
    </Flex>
  );
}
