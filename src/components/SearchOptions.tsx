import {
  Group,
  Button,
  ActionIcon,
  Collapse,
  Divider,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconChevronDown,
  IconReload,
  IconDotsVertical,
} from "@tabler/icons-react";

export function SearchOptions() {
  const [opened, { toggle }] = useDisclosure(false);
  
  return (
    <>
      <Group justify="center">
        <Button
          onClick={toggle}
          size="compact-xl"
          radius="md"
          rightSection={<IconChevronDown />}
        >
          <Text fw="bold">Search Filter</Text>
        </Button>
        <Button size="compact-xl" radius="md">
          <Text fw="bold">Advanced Search</Text>
        </Button>
        <ActionIcon size="40" radius="md">
          <IconReload />
        </ActionIcon>
        <ActionIcon size="40" radius="md">
          <IconDotsVertical />
        </ActionIcon>
      </Group>
      <Collapse in={opened}>
        <Divider my="md" />
        <Group justify="center">
          <Button variant="outline">Cookie</Button>
          <Button variant="outline">Item</Button>
          <Button variant="outline">Trap</Button>
          <Button variant="outline">Stage</Button>
        </Group>

        <Divider my="md" />
      </Collapse>
      <Text ta="center">no active filters</Text>
    </>
  );
}
