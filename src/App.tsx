import {
  ActionIcon,
  AppShell,
  Button,
  Group,
  Tabs,
  TextInput,
  UnstyledButton,
  Text,
  SimpleGrid,
  ScrollArea,
  MantineProvider,
  Box,
  Badge,
} from "@mantine/core";
import "@mantine/core/styles.css";
import "./App.css";
import { useState } from "react";
import cardData from "./assets/card.json";
import ResultCard from "./components/ResultCard";
import { DndContext, DragOverlay, useDroppable } from "@dnd-kit/core";
import Draggable from "./components/Draggable";

const DroppableGrid = ({
  id,
  cards,
  counts = {} as Record<string, number>,
  prefix = "",
  unique = false,
  bgColor = "#1e1e1e",
  cols = 4,
}: {
  id: string;
  cards: string[];
  counts?: Record<string, number>;
  prefix?: string;
  unique?: boolean;
  bgColor?: string;
  cols?: number;
}) => {
  const { setNodeRef } = useDroppable({ id });

  const displayCards = unique ? Array.from(new Set(cards)) : cards;

  return (
    <ScrollArea offsetScrollbars style={{ flex: 1, minHeight: 0, marginTop: 16 }}>
      <SimpleGrid
        ref={setNodeRef}
        cols={cols}
        spacing="sm"
        style={{
          minHeight: 0,
          borderRadius: 8,
          padding: 8,
          backgroundColor: bgColor,
        }}
      >
        {displayCards.map((cardId, index) => (
          <Draggable key={`${prefix}-${cardId}`} id={`${prefix}-${index}-${cardId}`}>
            <Box style={{ position: "relative" }}>
              <ResultCard cardNo={cardId} />
              {counts[cardId] ? (
                <Badge
                  variant="filled"
                  color="blue"
                  size="sm"
                  style={{ position: "absolute", top: 4, right: 4 }}
                >
                  {counts[cardId]}
                </Badge>
              ) : null}
            </Box>
          </Draggable>
        ))}
      </SimpleGrid>
    </ScrollArea>
  );
};

export default function App() {
  const [input, setInput] = useState(""),
    [searchCards, setSearchCards] = useState<string[]>([]),
    [deckCards, setDeckCards] = useState<string[]>([]),
    [activeId, setActiveId] = useState<string | null>(null);

  const beginSearch = (v: string) =>
    setSearchCards(
      cardData
        .filter((c) => c.title.toLowerCase().includes(v.toLowerCase()))
        .map((c) => c.field_cardNo_suyeowsc)
    );

  const deckCounts: Record<string, number> = {};
  deckCards.forEach((id) => {
    deckCounts[id] = (deckCounts[id] || 0) + 1;
  });

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    setActiveId(null);
    if (!over) return;

    const cardId = String(active.id).replace(/^search-\d+-|^deck-\d+-/, "");

    if (over.id === "deck") {
      const totalCards = deckCards.length;
      const count = deckCards.filter((id) => id === cardId).length;
      if (count < 4 && totalCards < 60) {
        setDeckCards((prev) => [...prev, cardId]);
      }
    }

    if (over.id === "search") {
      const index = deckCards.findIndex((id) => id === cardId);
      if (index !== -1)
        setDeckCards((prev) => {
          const copy = [...prev];
          copy.splice(index, 1);
          return copy;
        });
    }
  };

  return (
    <MantineProvider defaultColorScheme="dark">
      <AppShell
        header={{ height: 60 }}
        navbar={{ width: 400, breakpoint: "xl" }}
        aside={{ width: 600, breakpoint: "lg" }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            {["My Decks", "Deck Builder"].map((t) => (
              <UnstyledButton key={t}>{t}</UnstyledButton>
            ))}
          </Group>
        </AppShell.Header>

        <AppShell.Navbar p="md" />

        <DndContext
          onDragStart={(e) => setActiveId(String(e.active.id))}
          onDragEnd={handleDragEnd}
        >
          <AppShell.Main>
            <Group>
              {["Save", "Share", "Tools"].map((t) => (
                <Button key={t}>{t}</Button>
              ))}
            </Group>

            <Group>
              <Text>{deckCards.length} cards in deck</Text>
              {[1, 2, 3, 4].map((n) => (
                <ActionIcon key={n}>{n}</ActionIcon>
              ))}
            </Group>

              <DroppableGrid
                id="deck"
                cards={deckCards}
                counts={deckCounts}
                prefix="deck"
                unique
                bgColor="#2a2a2a"
                cols={6}
              />
          </AppShell.Main>

          <AppShell.Aside p="md">
            <Tabs
              defaultValue="Search"
              style={{ display: "flex", flexDirection: "column", height: "100%" }}
            >
              <Tabs.List>
                {["Search", "Favorites"].map((t) => (
                  <Tabs.Tab key={t} value={t}>
                    {t === "Search" ? "Card Search" : "Favorites"}
                  </Tabs.Tab>
                ))}
              </Tabs.List>

              <Tabs.Panel
                value="Search"
                style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}
              >
                <Group wrap="nowrap">
                  <TextInput
                    size="lg"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && beginSearch(input)
                    }
                    style={{ flexGrow: 1 }}
                  />
                  <Button
                    size="lg"
                    style={{ flexGrow: 0 }}
                    onClick={() => beginSearch(input)}
                  >
                    Search
                  </Button>
                </Group>

                <Text>{searchCards.length} cards found</Text>

                  <DroppableGrid
                    id="search"
                    cards={searchCards}
                    prefix="search"
                    bgColor="#1e1e1e"
                    cols={4}
                  />
              </Tabs.Panel>

              <Tabs.Panel value="Favorites">Favs</Tabs.Panel>
            </Tabs>
          </AppShell.Aside>

          <DragOverlay>
            {activeId && <ResultCard cardNo={activeId.replace(/^search-\d+-|^deck-\d+-/, "")} />}
          </DragOverlay>
        </DndContext>

        <AppShell.Footer hiddenFrom="md">Footer</AppShell.Footer>
      </AppShell>
    </MantineProvider>
  );
}
