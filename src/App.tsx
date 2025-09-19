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
  Text,
  Stack,
  ActionIcon,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
import CardsJSON from "./assets/card.json";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Draggable } from "./components/Draggable.tsx";
import { Droppable } from "./components/Droppable.tsx";
import type { Card } from "./types/Card.ts";
import parse from "html-react-parser";
import { IconDotsVertical, IconHeart } from "@tabler/icons-react";
import getImg from "./functions/getImg.ts";
import replaceIcons from "./functions/replaceIcons.ts";
import { Grid, type CellComponentProps } from "react-window";

export default function App() {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 20,
      },
    })
  );
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

  const [clickedId, setClickedId] = useState<number>(0);

  function dragCard(gridId: string, cardId: number) {
    return (
      <Draggable
        image={getImg(cardLookup.get(cardId)?.cardImage)}
        key={`${gridId}-${cardId}`}
        id={`${gridId}-${cardId}`}
        lookupId={cardId}
        from={gridId}
        onclick={() => {
          setClickedId(cardId);
        }}
      />
    );
  }

  function cardGrid(gridId: string, cols: number, cardIds: number[]) {
    const cardImgs =
      gridId === "deck"
        ? cardIds.map((cardId) => (
            <Indicator position="bottom-end" size="20" label={deck.get(cardId)}>
              {dragCard(gridId, cardId)}
            </Indicator>
          ))
        : cardIds.map((cardId) => dragCard(gridId, cardId));
    return (
      <Droppable id={gridId}>
        <SimpleGrid cols={cols}>{cardImgs}</SimpleGrid>
      </Droppable>
    );
  }

  function Example(contacts: number[], columnCount: number) {
    return (
      <Grid
        cellComponent={CellComponent}
        cellProps={{ columnCount, contacts }}
        columnCount={columnCount}
        columnWidth={200}
        rowCount={Math.ceil(contacts.length / columnCount)}
        rowHeight={200}
      />
    );
  }

  function CellComponent({
    columnCount,
    contacts,
    columnIndex,
    rowIndex,
    style,
  }: CellComponentProps<{
    columnCount: number;
    contacts: number[];
  }>) {
    const content = contacts[rowIndex * columnCount + columnIndex];
    return (
      <div className="truncate" style={style}>
        {content > contacts.length ? (
          <Image src={getImg(cardLookup.get(content)?.cardImage)} />
        ) : null}
      </div>
    );
  }

  const [activeId, setActiveId] = useState<number | null>(null);
  const [activeImg, setActiveImg] = useState<string | undefined>();

  function handleDragStart(event: any) {
    const { active } = event;
    setActiveId(event.active.id);
    setActiveImg(active.data.current.image);
  }

  function handleDragEnd(event: any) {
    const { active } = event;
    if (
      !event.over ||
      event.active.id == null ||
      active.data.current.lookupId == null
    )
      return;
    const newMap = new Map(deck);
    if (event.over.id === "deck" && active.data.current.from === "results") {
      if (!deck.has(active.data.current.lookupId)) {
        newMap.set(active.data.current.lookupId, 1);
      } else if ((deck.get(active.data.current.lookupId) ?? 0) < 4) {
        newMap.set(
          active.data.current.lookupId,
          (deck.get(active.data.current.lookupId) ?? 0) + 1
        );
      }
    }
    if (event.over.id === "results" && active.data.current.from === "deck") {
      if ((deck.get(active.data.current.lookupId) ?? 0) > 1) {
        newMap.set(
          active.data.current.lookupId,
          (deck.get(active.data.current.lookupId) ?? 0) - 1
        );
      }
      if ((deck.get(active.data.current.lookupId) ?? 0) == 1) {
        newMap.delete(active.data.current.lookupId);
      }
    }
    setDeck(newMap);
    setActiveId(null);
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
        <AppShell.Navbar p="md">
          <Stack>
            <Group justify="space-between">
              <Stack gap="xs">
                <Text size="xl">{cardLookup.get(clickedId)?.title}</Text>
                <Text size="sm">
                  {cardLookup.get(clickedId)?.field_cardNo_suyeowsc}
                </Text>
              </Stack>
              <Group gap="xs">
                <ActionIcon variant="filled" size="lg" radius="md">
                  <IconHeart />
                </ActionIcon>
                <ActionIcon variant="filled" size="lg" radius="md">
                  <IconDotsVertical />
                </ActionIcon>
              </Group>
            </Group>
            <ScrollArea>
              <Stack>
                {clickedId ? (
                  <Image src={getImg(cardLookup.get(clickedId)?.cardImage)} />
                ) : null}
                <Text>
                  {parse(
                    replaceIcons(
                      cardLookup.get(clickedId)?.field_cardDesc ?? ""
                    )
                  )}
                </Text>
              </Stack>
            </ScrollArea>
          </Stack>
        </AppShell.Navbar>
        <DndContext
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          sensors={sensors}
        >
          <AppShell.Main
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {cardGrid("deck", isMobile ? 4 : 8, [...deck.keys()])}
            {Example(resultIds, 4)}
          </AppShell.Main>
          <AppShell.Aside p="md">
            <Group>
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
            <Text>{resultIds.length} cards found</Text>
            <ScrollArea>{cardGrid("results", 4, resultIds)}</ScrollArea>
          </AppShell.Aside>
          <DragOverlay>
            {activeId ? <Image src={activeImg} /> : null}
          </DragOverlay>
        </DndContext>
        <AppShell.Footer p="md">Footer</AppShell.Footer>
      </AppShell>
    </MantineProvider>
  );
}
