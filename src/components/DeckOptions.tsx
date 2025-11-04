import { Group, Button, TextInput, Text } from "@mantine/core";
import { IconArrowBackUp, IconChevronDown } from "@tabler/icons-react";

export function DeckOptions() {
  return (
    <Group p="xs" justify="space-between">
      <Group>
        <Button color="gray" size="lg" variant="outline">
        </Button>
        <TextInput fw="bold" value={"New Deck"} size="lg" variant="filled" />
      </Group>
      <Group>
        <Button.Group>
          <Button variant="default" size="compact-xl" radius="md">
            <Text fw="bold">Save</Text>
          </Button>
          <Button variant="default" size="compact-xl" radius="md">
            <IconArrowBackUp />
          </Button>
        </Button.Group>
        <Button
          variant="default"
          size="compact-xl"
          radius="md"
          rightSection={<IconChevronDown />}
        >
          <Text fw="bold">Share</Text>
        </Button>
        <Button
          variant="default"
          size="compact-xl"
          radius="md"
          rightSection={<IconChevronDown />}
        >
          <Text fw="bold">Tools</Text>
        </Button>
        <Button variant="default" size="compact-xl" radius="md">
          <Text fw="bold">Playtest</Text>
        </Button>
      </Group>
    </Group>
  );
}
