import { AppShell, Image, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Aside } from "./components/Aside";
import { Header } from "./components/Header";
import { theme } from "./theme/Theme";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useReducer, useState } from "react";
import { CardInfo } from "./components/CardInfo";
import { DeckArea } from "./components/DeckArea";
import { ClickedContext } from "./contexts/ClickedContext";
import { getImage } from "./functions/cardFunctions";
import type { DeckAction } from "./types/DeckAction";
import { DeckContext } from "./contexts/DeckContext";

export default function App() {
  const pointerSensor = useSensor(PointerSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      distance: 10,
    },
  });
  const sensors = useSensors(pointerSensor);
  const [activeId, setActiveId] = useState<number | null>(null);

  function deckReducer(
    state: Map<number, number>,
    action: DeckAction
  ): Map<number, number> {
    const newDeckState = new Map<number, number>(state);
    const cardCount = newDeckState.get(action.cardId) ?? 0;

    switch (action.type) {
      case "increment": {
        if (!newDeckState.has(action.cardId))
          newDeckState.set(action.cardId, 1);
        else if (cardCount < 4) newDeckState.set(action.cardId, cardCount + 1);
        return newDeckState;
      }
      case "decrement": {
        if (newDeckState.has(action.cardId)) {
          if (cardCount > 1) newDeckState.set(action.cardId, cardCount - 1);
          else newDeckState.delete(action.cardId);
        }
        return newDeckState;
      }
      default:
        return state;
    }
  }

  const [deckState, deckDispatch] = useReducer(
    deckReducer,
    new Map<number, number>([])
  );

  const [clickedId, setClickedId] = useState<number>(0);

  function handleDragStart(event: any): void {
    const { active } = event;
    setActiveId(active.data.current.lookupId);
  }

  function handleDragEnd(event: any): void {
    const { active, over } = event;
    if (over && over.data.current.accepts == active.data.current.from && activeId) {
      if (over.data.current.accepts == "results") {
        deckDispatch({ type: "increment", cardId: activeId });
      }
      if (over.data.current.accepts == "deck") {
        deckDispatch({ type: "decrement", cardId: activeId});
      }
    }
    setActiveId(null);
  }

  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <AppShell
        header={{ height: 70 }}
        aside={{ width: 580, breakpoint: "md" }}
        navbar={{ width: 390, breakpoint: "md" }}
      >
        <AppShell.Header p="xs">
          <Header />
        </AppShell.Header>
        <DeckContext.Provider value={{ deckState, deckDispatch }}>
          <ClickedContext.Provider value={{ clickedId, setClickedId }}>
            <AppShell.Navbar withBorder={false} p="xs">
              <CardInfo />
            </AppShell.Navbar>
            <DndContext
              sensors={sensors}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <AppShell.Main
                style={{
                  display: "flex",
                  flexDirection: "column",
                  paddingBottom: ".6em",
                }}
              >
                <DeckArea />
              </AppShell.Main>
              <AppShell.Aside withBorder={false} p="xs">
                <Aside />
              </AppShell.Aside>
              <DragOverlay>
                {activeId ? <Image src={getImage(activeId)} /> : null}
              </DragOverlay>
            </DndContext>
          </ClickedContext.Provider>
        </DeckContext.Provider>
        <AppShell.Footer></AppShell.Footer>
      </AppShell>
    </MantineProvider>
  );
}
