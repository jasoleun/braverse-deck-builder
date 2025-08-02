import { Group, Button, TextInput, Text, ActionIcon, Grid, AppShell } from "@mantine/core";

export default function Main() {
  return (
    <AppShell.Main>
      <Group>
        <TextInput size="lg" />
        <Button size="md">Save</Button>
        <Button size="md">Share</Button>
        <Button size="md">Tools</Button>
      </Group>
      <Group>
        <Text>0 cards</Text>
        <ActionIcon size="md">1</ActionIcon>
        <ActionIcon size="md">2</ActionIcon>
        <ActionIcon size="md">3</ActionIcon>
        <ActionIcon size="md">4</ActionIcon>
      </Group>
      <Grid>

      </Grid>
    </AppShell.Main>
  );
}
