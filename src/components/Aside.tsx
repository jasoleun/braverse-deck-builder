import { Tabs, Text } from "@mantine/core";
import { SearchBar } from "./SearchBar";
import { SearchOptions } from "./SearchOptions";
import { ResultsGrid } from "./ResultsGrid";
import { ResultsContext } from "../contexts/ResultsContext";
import { useState } from "react";

export function Aside() {
  const [results, setResults] = useState<number[]>([]);
  return (
    <Tabs
      defaultValue="search"
      bd="2px solid gray"
      bdrs="md"
      variant="pills"
      radius="0"
      flex={1}
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Tabs.List>
        <Tabs.Tab value="search">
          <Text fw="bold">Card Search</Text>
        </Tabs.Tab>
        <Tabs.Tab value="favorites">
          <Text fw="bold">Favorites</Text>
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel
        value="search"
        flex={1}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ResultsContext.Provider value={{ results, setResults }}>
          <SearchBar />
          <SearchOptions />
          <ResultsGrid />
        </ResultsContext.Provider>
      </Tabs.Panel>
      <Tabs.Panel value="favorites">Favorites</Tabs.Panel>
    </Tabs>
  );
}
