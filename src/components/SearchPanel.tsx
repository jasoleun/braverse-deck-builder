import {
  Button,
  Group,
  ScrollArea,
  SimpleGrid,
  Text,
  TextInput,
} from "@mantine/core";
import { useState } from "react";
import cardData from "../assets/card.json";
import ResultCard from "./ResultCard";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import Draggable from "./Draggable";

export default function SearchPanel() {
  const [input, setInput] = useState<string>();
  const [resultIds, setResultIds] = useState<string[]>([]);
  const [resultCount, setResultCount] = useState<string>();

  const beginSearch = (value: string) => {
    const ids: string[] = cardData
      .filter((card) => card.title.toLowerCase().includes(value.toLowerCase()))
      .map((card) => card.field_cardNo_suyeowsc);
    setResultCount(String(resultIds.length));
    setResultIds(ids);
  };

  const cardResults = resultIds.map((cardNo: string) => (
    <Draggable key={cardNo} id={cardNo}>
      <ResultCard cardNo={cardNo}></ResultCard>
    </Draggable>
  ));

  const [activeId, setActiveId] = useState<string | null>(null);

  function handleDragStart(event: any) {
    console.log(event.active.id);
    setActiveId(event.active.id);
  }

  function handleDragEnd() {
    setActiveId(null);
  }

  return (
    <>
      <Group grow preventGrowOverflow={false} wrap="nowrap">
        <TextInput
          size="lg"
          style={{ flexGrow: 1 }}
          value={input}
          onChange={(e) => setInput(String(e.target.value))}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              beginSearch(String(input));
            }
          }}
        />
        <Button
          size="lg"
          style={{ flexGrow: 0 }}
          onClick={() => beginSearch(String(input))}
        >
          Search
        </Button>
      </Group>
      <Text>{resultCount} cards found</Text>
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <ScrollArea offsetScrollbars style={{ height: "78vh" }}>
          <SimpleGrid cols={4}>{cardResults}</SimpleGrid>
        </ScrollArea>
        <DragOverlay>
          {activeId ? <ResultCard cardNo={activeId} /> : null}
        </DragOverlay>
      </DndContext>
    </>
  );
}
