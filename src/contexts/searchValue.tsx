import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface Search {
  searchValue: string;
  searchHistory: string[];
  updateSearchValue?(value: string): void;
  updateSearchHistory?(value: string): void;
}

const SearchContext = createContext<Search>({
  searchValue: "",
  searchHistory: [],
});

export function useSearchContext() {
  const {
    searchValue,
    updateSearchValue,
    searchHistory,
    updateSearchHistory,
  } = useContext(SearchContext);

  return { searchValue, updateSearchValue, searchHistory, updateSearchHistory };
}

interface Props {
  children: ReactNode;
}

export function SearchProvider({ children }: Props) {
  const [searchValue, setValue] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  useEffect(() => {
    const loadedHistory = JSON.parse(localStorage.getItem("history"));
    if (loadedHistory) {
      setSearchHistory(loadedHistory);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(searchHistory));
  }, [searchHistory]);

  const updateSearchValue = useCallback(
    (value: string) => {
      setValue(value);
    },
    [searchValue]
  );

  const updateSearchHistory = useCallback(
    (value: string) => {
      const updatedHistory = (history: string[]) =>
        Array.from(
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
        ).slice(0, 50);

      setSearchHistory((state) => updatedHistory(state));
    },
    [searchValue]
  );

  return (
    <SearchContext.Provider
      value={{
        searchValue,
        updateSearchValue,
        searchHistory,
        updateSearchHistory,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
