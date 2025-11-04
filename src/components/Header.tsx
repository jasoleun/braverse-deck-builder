import { Button, Group, Image } from "@mantine/core";

export function Header() {
  return (
    <Group>
      <Image
        h="45px"
        w="auto"
        fit="contain"
        src={"braverse-deck-builder/logo/logo_en.webp"}
      />
      <Button variant="subtle" radius="0" size="lg" p="sm" fw="bold">
        My Decks
      </Button>
      <Button variant="subtle" radius="0" size="lg" p="sm" fw="bold">
        Deck Builder
      </Button>
    </Group>
  );
}
