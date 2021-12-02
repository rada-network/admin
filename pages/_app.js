import { createTheme, ThemeProvider } from "@mui/material/styles";
import Router from "next/router";
import MainLayout from "../layouts/MainLayout";
import { ProvideAuth } from "../hooks/useAuth";
import useMediaQuery from "@mui/material/useMediaQuery";

import NProgress from "nprogress";
import "../styles/global.scss";
import { useMemo } from "react";
import { ChainId, DAppProvider, useEthers } from "@usedapp/core";

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

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
