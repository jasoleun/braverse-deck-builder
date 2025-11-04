import { createContext, useContext, type Dispatch } from "react";
import type { DeckAction } from "../types/DeckAction";

interface DeckContextType {
  deckState: Map<number, number>;
  deckDispatch: Dispatch<DeckAction>;
}

export const DeckContext = createContext<DeckContextType | undefined>(undefined);

export const useDeck = () => {
  const context = useContext(DeckContext);
  if (!context) {
    throw new Error("useDeck must be used within a DeckProvider");
  }
  return context;
};
