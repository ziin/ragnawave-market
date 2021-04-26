import type { AppProps } from "next/app";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { SearchProvider } from "@contexts/searchValue";
import { theme } from "@styles/theme";
import "@fontsource/raleway/700.css";
import "@fontsource/roboto/400.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <SearchProvider>
        <Component {...pageProps} />
      </SearchProvider>
    </ChakraProvider>
  );
}

export default MyApp;
