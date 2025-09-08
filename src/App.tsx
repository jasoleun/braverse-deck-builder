import {
  AppShell,
  MantineProvider,
  em,
  Button,
  Group,
  SimpleGrid,
  TextInput,
  Image,
  ScrollArea,
  Indicator,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
import CardsJSON from "./assets/card.json";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { Draggable } from "./components/Draggable.tsx";
import { Droppable } from "./components/Droppable.tsx";
import type { Card } from "./types/Card.ts";

export default function App() {
  const cardLookup: Map<number, Card> = new Map(
    CardsJSON.map((card) => [card.id, card])
  );

  const isMobile = useMediaQuery(`(max-width: ${em(1200)})`);

  const [query, setQuery] = useState<string>("");
  const [resultIds, setResultIds] = useState<number[]>([]);

  function handleSearch() {
    setResultIds(
      CardsJSON.filter((card) =>
        card.title.toLowerCase().includes(query.toLowerCase())
      ).map((card) => card.id)
    );
  }

  const [deck, setDeck] = useState<Map<number, number>>(new Map());

  function cardGrid(gridId: string, cols: number, cardIds: number[]) {
    const cardImgs =
      gridId === "deck"
        ? cardIds.map((cardId) => (
          <Indicator position="bottom-end" size="md" label={deck.get(cardId)}>
            <Draggable
              image={cardLookup.get(cardId)?.cardImage}
              key={`${gridId}-${cardId}`}
              id={`${gridId}-${cardId}`}
              lookupId={cardId}
            />
          </Indicator>
          ))
        : cardIds.map((cardId) => (
            <Draggable
              image={cardLookup.get(cardId)?.cardImage}
              key={`${gridId}-${cardId}`}
              id={`${gridId}-${cardId}`}
              lookupId={cardId}
            />
          ));
    return (
      <Droppable id={gridId}>
        <SimpleGrid cols={cols}>{cardImgs}</SimpleGrid>
      </Droppable>
    );
  }

  const [activeId, setActiveId] = useState<number | null>(null);
  const [activeImg, setActiveImg] = useState<string | null>(null);
  const [lookupId, setLookupId] = useState<number | null>(null);

  function handleDragStart(event: any) {
    const { active } = event;
    setActiveId(event.active.id);
    setActiveImg(active.data.current.image);
    setLookupId(active.data.current.lookupId);
  }

  function handleDragEnd(event: any) {
    if (!event.over || activeId == null || lookupId == null) return;
    const newMap = new Map(deck);
    if (event.over.id === "deck") {
      if (!deck.has(lookupId)) {
        newMap.set(lookupId, 1);
      } else if ((deck.get(lookupId) ?? 0) < 4) {
        newMap.set(lookupId, (deck.get(lookupId) ?? 0) + 1);
      }
    }
    if (event.over.id === "results" && deck.has(lookupId)) {
      if ((deck.get(lookupId) ?? 0) > 1) {
        newMap.set(lookupId, (deck.get(lookupId) ?? 0) - 1);
      }
      if ((deck.get(lookupId) ?? 0) == 1) {
        newMap.delete(lookupId);
      }
    }
    setDeck(newMap);
    setActiveId(null);
    setLookupId(null);
  }

  return (
    <MantineProvider defaultColorScheme="dark">
      <AppShell
        header={{ height: 60 }}
        footer={{ height: 60, collapsed: isMobile ? false : true }}
        navbar={{
          width: 400,
          breakpoint: "xl",
          collapsed: { desktop: false, mobile: true },
        }}
        aside={{
          width: 575,
          breakpoint: "lg",
          collapsed: { desktop: false, mobile: true },
        }}
        padding="md"
      >
        <AppShell.Header p="md">Header</AppShell.Header>
        <AppShell.Navbar p="md">Navbar</AppShell.Navbar>
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <AppShell.Main style={{ display: "flex", flexDirection: "column" }}>
            {cardGrid("deck", isMobile ? 4 : 8, [...deck.keys()])}
          </AppShell.Main>
          <AppShell.Aside>
            <Group p="md">
              <TextInput
                size="md"
                flex={1}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") handleSearch();
                }}
              />
              <Button size="md" onClick={() => handleSearch()}>
                Search
              </Button>
            </Group>
            <ScrollArea p="md">{cardGrid("results", 4, resultIds)}</ScrollArea>
          </AppShell.Aside>
          <DragOverlay>
            {activeId ? (
              <Image src={"/braverse-deck-builder/cards/" + activeImg} />
            ) : null}
          </DragOverlay>
        </DndContext>
        <AppShell.Footer p="md">Footer</AppShell.Footer>
      </AppShell>
    </MantineProvider>
  );
}
