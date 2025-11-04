import { Stack, Text, Image } from "@mantine/core";
import { VirtuosoGrid } from "react-virtuoso";
import { getImage } from "../functions/cardFunctions";
import { Draggable } from "./Draggable";
import { gridComponents } from "./gridComponents";
import { useResults } from "../contexts/ResultsContext";
import { useClicked } from "../contexts/ClickedContext";
import { Droppable } from "./Droppable";

export function ResultsGrid() {
  const { results } = useResults();
  const { setClickedId: setClickedId } = useClicked();

  return (
    <Stack p="xs" flex={1}>
      <Text>{results.length} cards found</Text>
      <Droppable id="results" accepts={["deck"]}>
        <VirtuosoGrid
          totalCount={results.length}
          components={gridComponents("25%")}
          itemContent={(index) => (
            <Draggable
              id={"results" + results[index]}
              lookupId={results[index]}
              from={"results"}
            >
              <Image
                src={getImage(results[index])}
                onClick={() => setClickedId(results[index])}
              />
            </Draggable>
          )}
        />
      </Droppable>
    </Stack>
  );
}
