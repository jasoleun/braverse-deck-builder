import { AppShell, Group, UnstyledButton } from "@mantine/core";

export default function Header() {
  return (
    <AppShell.Header>
      <Group h="100%" px="md">
        <UnstyledButton>My Decks</UnstyledButton>
        <UnstyledButton>Deck Builder</UnstyledButton>
      </Group>
    </AppShell.Header>
  );
}
