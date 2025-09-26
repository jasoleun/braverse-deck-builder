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
  Container,
  Box,
  UnstyledButton,
  Tabs,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { useMediaQuery } from "@mantine/hooks";
import { forwardRef, useState } from "react";
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
import {
  IconDotsVertical,
  IconHeart,
  IconArrowBackUp,
  IconChevronDown,
  IconReload,
} from "@tabler/icons-react";
import getImg from "./functions/getImg.ts";
import replaceIcons from "./functions/replaceIcons.ts";
import { VirtuosoGrid } from "react-virtuoso";

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
      <Droppable style={{}} id={gridId}>
        <SimpleGrid cols={cols}>{cardImgs}</SimpleGrid>
      </Droppable>
    );
  }

  type DivProps = React.HTMLAttributes<HTMLDivElement>;

  const gridComponents = {
    List: forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
      ({ style, children, ...props }, ref) => (
        <div
          ref={ref}
          {...props}
          style={{
            display: "flex",
            flexWrap: "wrap",
            ...style,
          }}
        >
          {children}
        </div>
      )
    ),
    Item: ({ children, ...props }: React.PropsWithChildren<DivProps>) => (
      <div
        {...props}
        style={{
          padding: "0.5rem",
          width: "25%",
          display: "flex",
          flex: "none",
          alignContent: "stretch",
          boxSizing: "border-box",
        }}
      >
        {children}
      </div>
    ),
  };

  const ItemWrapper = ({
    children,
    style,
    ...props
  }: React.PropsWithChildren<DivProps>) => (
    <div
      {...props}
      style={{
        display: "flex",
        flex: 1,
        textAlign: "center",
        padding: "0.1rem 0.1rem",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </div>
  );

  function addToDeck(cardId: number) {
    const newMap = new Map(deck);
    if (!deck.has(cardId)) {
      newMap.set(cardId, 1);
    } else if ((deck.get(cardId) ?? 0) < 4) {
      newMap.set(cardId, (deck.get(cardId) ?? 0) + 1);
    }
    setDeck(newMap);
  }

  function removeFromDeck(cardId: number) {
    const newMap = new Map(deck);
    if ((deck.get(cardId) ?? 0) > 1) {
      newMap.set(cardId, (deck.get(cardId) ?? 0) - 1);
    }
    if ((deck.get(cardId) ?? 0) == 1) {
      newMap.delete(cardId);
    }
    setDeck(newMap);
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
    if (event.over.id === "deck" && active.data.current.from === "results") {
      addToDeck(active.data.current.lookupId);
    }
    if (event.over.id === "results" && active.data.current.from === "deck") {
      removeFromDeck(active.data.current.lookupId);
    }
    setActiveId(null);
  }

  function cardSummary() {
    return (
      <Stack>
        <Stack>
          <Group justify="space-between">
            <Stack gap="xs">
              <Text size="xl">{cardLookup.get(clickedId)?.title}</Text>
              <Text size="sm">
                {cardLookup.get(clickedId)?.field_cardNo_suyeowsc}
              </Text>
            </Stack>
            <Group gap="xs">
              <ActionIcon variant={"default"} size="lg">
                <IconHeart />
              </ActionIcon>
              <ActionIcon variant={"default"} size="lg">
                <IconDotsVertical />
              </ActionIcon>
            </Group>
          </Group>
          <Button.Group borderWidth={1}>
            <Button
              flex={1}
              variant="default"
              onClick={() => removeFromDeck(clickedId)}
            >
              -1
            </Button>
            <Button.GroupSection flex={2} variant="default">
              {deck.get(clickedId) ? deck.get(clickedId) : 0} in deck
            </Button.GroupSection>
            <Button
              flex={1}
              variant="default"
              onClick={() => addToDeck(clickedId)}
            >
              +1
            </Button>
          </Button.Group>
        </Stack>
        <ScrollArea>
          <Stack>
            <Image src={getImg(cardLookup.get(clickedId)?.cardImage)} />
            <Text>
              {parse(
                replaceIcons(cardLookup.get(clickedId)?.field_cardDesc ?? "")
              )}
            </Text>
          </Stack>
        </ScrollArea>
      </Stack>
    );
  }

  const deckSum = () => {
    let sum = 0;

    deck.forEach((value) => {
      sum += value;
    });
    return sum;
  };

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
        <AppShell.Header p="xs">
          <Group h="100%">
            <Image
              src={"braverse-deck-builder/logo_en.webp"}
              h="100%"
              w="auto"
              fit="contain"
            />
          </Group>
        </AppShell.Header>
        <AppShell.Navbar p="md">
          {clickedId ? cardSummary() : null}
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
            <Stack flex={1}>
              <Group justify="space-between">
                <Group>
                  <Button variant="outline" color="gray"></Button>
                  <TextInput value={"New Deck"} />
                </Group>
                <Group>
                  <Button.Group>
                    <Button variant={"default"}>Save</Button>
                    <Button variant={"default"}>
                      <IconArrowBackUp />
                    </Button>
                  </Button.Group>
                  <Button
                    variant={"default"}
                    rightSection={<IconChevronDown />}
                  >
                    Share
                  </Button>
                  <Button
                    variant={"default"}
                    rightSection={<IconChevronDown />}
                  >
                    Tools
                  </Button>
                  <Button variant={"default"}>Playtest</Button>
                </Group>
              </Group>
              <Group>
                <Text>{deckSum()} cards</Text>
              </Group>
              {cardGrid("deck", isMobile ? 4 : 8, [...deck.keys()])}
            </Stack>
          </AppShell.Main>
          <AppShell.Aside p="md">
            <Stack flex={1}>
              <Group>
                <TextInput
                  size="md"
                  flex={1}
                  onChange={(event) => setQuery(event.currentTarget.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") handleSearch();
                  }}
                />
                <Button
                  size="md"
                  variant={"default"}
                  onClick={() => handleSearch()}
                >
                  Search
                </Button>
              </Group>
              <Group justify="center">
                <Button variant="default" rightSection={<IconChevronDown />}>Search Filter</Button>
                <Button variant="default">Advanced Search</Button>
                <ActionIcon size="lg" variant="default"><IconReload/></ActionIcon>
                <ActionIcon size="lg" variant="default"><IconDotsVertical/></ActionIcon>
              </Group>
              <Droppable id="results">
                <Text>{resultIds.length} cards found</Text>
                <VirtuosoGrid
                  style={{ height: "100%" }}
                  totalCount={resultIds.length}
                  components={gridComponents}
                  itemContent={(index) => (
                    <ItemWrapper>
                      {dragCard("results", resultIds[index])}
                    </ItemWrapper>
                  )}
                />
              </Droppable>
            </Stack>
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
