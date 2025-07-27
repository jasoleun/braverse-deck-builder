import { Group, UnstyledButton } from "@mantine/core";

export default function HeaderContent(){
    return(
          <Group h="100%" px="md">
            <UnstyledButton>My Decks</UnstyledButton>
            <UnstyledButton>Deck Builder</UnstyledButton>
          </Group>
    );
}