import { Stack, Image } from "@mantine/core";
import { Droppable } from "./Droppable";
import { DeckOptions } from "./DeckOptions";
import { DeckView } from "./DeckView";
import { VirtuosoGrid } from "react-virtuoso";
import { Draggable } from "./Draggable";
import { getImage } from "../functions/cardFunctions";
import { useClicked } from "../contexts/ClickedContext";
import { useDeck } from "../contexts/DeckContext";
import { gridComponents } from "./gridComponents";

export function DeckArea() {
  const { setClickedId: setClickedId } = useClicked();
  const { deckState } = useDeck();

  const deckIds = Array.from(deckState.keys());
  return (
    <Stack
      bd="2px solid gray"
      bdrs="md"
      flex={1}
      style={{
        marginTop: "0.6em",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <DeckOptions />
      <DeckView />
      <Droppable style={{ flex: 1, minHeight: 0 }} id="deck" accepts={["results"]}>
        <VirtuosoGrid
          style={{ flex: 1, minHeight: 0 }}
          totalCount={deckIds.length}
          components={gridComponents("12.5%")}
          itemContent={(index) => (
            <Draggable
              id={"deck" + deckIds[index]}
              lookupId={deckIds[index]}
              from={"deck"}
            >
              <Image
                src={getImage(deckIds[index])}
                onClick={() => setClickedId(deckIds[index])}
              />
            </Draggable>
          )}
        />
      </Droppable>
    </Stack>
  );
}
