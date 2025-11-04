import { createContext, useContext } from "react";
import type { Dispatch, SetStateAction } from "react";

interface ResultsContextType {
  results: number[];
  setResults: Dispatch<SetStateAction<number[]>>;
}

export const ResultsContext = createContext<ResultsContextType | undefined>(undefined);

export const useResults = () => {
  const context = useContext(ResultsContext);
  if (!context) {
    throw new Error("useResults must be used within a ResultsProvider");
  }
  return context;
};
