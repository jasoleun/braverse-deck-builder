import { Image } from "@mantine/core";

type ResultCardProps = {
  cardNo: string;
};
// TODO: Lazy load images

export default function ResultCard({ cardNo }: ResultCardProps) {
  return (
      <Image
        src={
          "/braverse-deck-builder/cards/" +
          cardNo.replace("-", "_") +
          ".png.webp"
        }
      />
  );
};
