import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

interface Search {
  value: string;
  history: string[];
  updateValue?(value: string): void;
}

const SearchContext = createContext<Search>({ value: "", history: [] });

export function useSearchContext() {
  const { value, history, updateValue } = useContext(SearchContext);

  return { value, history, updateValue };
}

interface Props {
  children: ReactNode;
}

export function SearchProvider({ children }: Props) {
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  const updateValue = useCallback(
    (value: string) => {
      setValue(value);

      const updatedHistory = Array.from(
        new Set(
          [value, ...history].map((h) => {
            if (
              h.toLowerCase().includes(value.toLowerCase()) ||
              value.toLowerCase().includes(h.toLowerCase())
            ) {
              return h.length > value.length ? h : value;
            }
            return h;
          })
        )
      ).slice(0, 20);

      setHistory(updatedHistory);
    },
    [value, history]
  );

  return (
    <SearchContext.Provider value={{ value, history, updateValue }}>
      {children}
    </SearchContext.Provider>
  );
}
