import { ActionIcon, Group, Text } from "@mantine/core";
import { IconDotsVertical, IconArrowsUpDown, IconLayoutGridFilled, IconBaselineDensitySmall } from "@tabler/icons-react";
import { useDeck } from "../contexts/DeckContext";

export function DeckView() {
  const { deckState } = useDeck();
  const cardCount = Array.from(deckState.values()).reduce((sum, value) => sum + value, 0);

  return (
    <Group justify="space-between" bd="2px solid gray">
      <Text fw="bold" p="xs">
        {cardCount} cards
      </Text>
      <Group>
        <ActionIcon variant="subtle">
          <IconDotsVertical />
        </ActionIcon>
        <ActionIcon variant="subtle">
          <IconArrowsUpDown />
        </ActionIcon>
        <ActionIcon variant="subtle">
          <IconLayoutGridFilled />
        </ActionIcon>
        <ActionIcon variant="subtle">
          <IconBaselineDensitySmall />
        </ActionIcon>
      </Group>
    </Group>
  );
}
