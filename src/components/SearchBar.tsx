import { Group, TextInput, Button } from "@mantine/core";
import { useState } from "react";
import { useResults } from "../contexts/ResultsContext";
import { filterByTitle } from "../functions/cardFunctions";

export function SearchBar() {
  const { setResults } = useResults();
  const [query, setQuery] = useState<string>("");

  return (
    <Group>
      <TextInput
        size="lg"
        onChange={(event) => setQuery(event.currentTarget.value.toLowerCase())}
        onKeyDown={(event) => {
          if (event.key == "Enter") setResults(filterByTitle(query));
        }}
        flex={1}
      />
      <Button
        onClick={() => setResults(filterByTitle(query))}
        variant="default"
        bd="2px solid gray"
        radius="md"
        size="lg"
      >
        Search
      </Button>
    </Group>
  );
}
