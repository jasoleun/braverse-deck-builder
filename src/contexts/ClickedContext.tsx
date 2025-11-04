import { createContext, useContext } from "react";
import type { Dispatch, SetStateAction } from "react";

interface ClickedContextType {
  clickedId: number;
  setClickedId: Dispatch<SetStateAction<number>>;
}

export const ClickedContext = createContext<ClickedContextType | undefined>(undefined);

export const useClicked = () => {
  const context = useContext(ClickedContext);
  if (!context) {
    throw new Error("useClicked must be used within a ClickedProvider");
  }
  return context;
};
