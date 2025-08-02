import {
  AppShell,
  Tabs,
} from "@mantine/core";
import SearchPanel from "./SearchPanel";

export default function Aside() {
  return (
    <AppShell.Aside p="md">
      <Tabs defaultValue="Search">
        <Tabs.List>
          <Tabs.Tab value="Search">Card Search</Tabs.Tab>
          <Tabs.Tab value="Favorites">Favorites</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="Search">
          <SearchPanel/>
        </Tabs.Panel>
        <Tabs.Panel value="Favorites">Favs</Tabs.Panel>
      </Tabs>
    </AppShell.Aside>
  );
}
