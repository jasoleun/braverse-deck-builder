import {
  AppShell,
  Burger,
  Button,
  Group,
  Tabs,
  Text,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import "./App.css";

function App() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <MantineProvider defaultColorScheme="dark">
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 400,
          breakpoint: "xl",
        }}
        aside={{
          width: 600,
          breakpoint: "lg",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <UnstyledButton>My Decks</UnstyledButton>
            <UnstyledButton>Deck Builder</UnstyledButton>
          </Group>
        </AppShell.Header>
        <AppShell.Main>
          <Text>This is the main section, your app content here.</Text>
          <Text>
            Layout used in most cases – Navbar and Header with fixed position
          </Text>
        </AppShell.Main>
        <AppShell.Navbar p="md"></AppShell.Navbar>
        <AppShell.Aside p="md">
          <Tabs defaultValue="gallery">
            <Tabs.List>
              <Tabs.Tab value="Search">Card Search</Tabs.Tab>
              <Tabs.Tab value="Favorites">Favorites</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="Search">
              <Group grow preventGrowOverflow={false} wrap="nowrap">
                <TextInput size="lg" style={{ flexGrow: 1 }} />
                <Button size="lg" style={{ flexGrow: 0 }}>
                  Search
                </Button>
              </Group>
            </Tabs.Panel>
            <Tabs.Panel value="Favorites">Favorites tab content</Tabs.Panel>
          </Tabs>
        </AppShell.Aside>
        <AppShell.Footer hiddenFrom="md">Footer</AppShell.Footer>
      </AppShell>
    </MantineProvider>
  );
}

export default App;
