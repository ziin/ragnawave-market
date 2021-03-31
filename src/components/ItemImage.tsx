import Image from "next/image";

interface Props {
  id: number;
  alt: string;
  size?: 18 | 24;
}

export default function ItemImage({ id, alt, size = 24 }: Props) {
  return (
    <Image
      src={`http://www.ragnawave.com.br/dist/db/items/${id}.png`}
      width={size}
      height={size}
      alt={alt}
    />
  );
}
