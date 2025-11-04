export type DeckAction =
  | { type: "increment"; cardId: number }
  | { type: "decrement"; cardId: number };
