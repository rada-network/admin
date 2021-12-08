import { createTheme, ThemeProvider } from "@mui/material/styles";
import MainLayout from "../layouts/MainLayout";
import { ProvideAuth } from "../hooks/useAuth";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useMemo } from "react";
import { ChainId, DAppProvider } from "@usedapp/core";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  const supportedChains =
    process.env.NEXT_PUBLIC_MAINNET === "true" ? [ChainId.BSC] : [ChainId.BSCTestnet];

  console.log("MyApp render", supportedChains);

  return (
    <DAppProvider
      config={{
        supportedChains: [ChainId.BSCTestnet, ChainId.BSC], // ,ChainId.Rinkeby
        notifications: {
          expirationPeriod: 1000,
          checkInterval: 1000,
        },
      }}
    >
      <ProvideAuth>
        <ThemeProvider theme={theme}>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </ThemeProvider>
      </ProvideAuth>
    </DAppProvider>
  );
}

export default MyApp;
