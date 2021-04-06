import { Box } from "@chakra-ui/layout";
import Image from "next/image";
import { useMemo } from "react";

interface Props {
  id: number;
  alt: string;
  size?: 18 | 24;
  isCard?: boolean;
}

export default function ItemImage({ id, alt, size = 24, isCard }: Props) {
  return useMemo(
    () => (
      <Box mr="1">
        <Image
          src={`http://www.ragnawave.com.br/dist/db/items/${
            isCard ? 4297 : id
          }.png`}
          layout="fixed"
          width={size}
          height={size}
          alt={alt}
        />
      </Box>
    ),
    [id, alt, size, isCard]
  );
}
