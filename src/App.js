import React, { Suspense } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { mainRoutes } from "./routes";
import { ChainId, DAppProvider } from "@usedapp/core";
import { ProvideGlobal } from "providers/Global";
import MainLayout from "layouts/MainLayout";
import Backdrop from "components/Backdrop";

function App() {
  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const supportedChains =
    process.env.REACT_APP_MAINNET === "true" ? [ChainId.BSC] : [ChainId.BSCTestnet];

  return (
    <DAppProvider
      config={{
        supportedChains: supportedChains,
        notifications: {
          expirationPeriod: 1000,
          checkInterval: 1000,
        },
      }}
    >
      <ProvideGlobal>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <MainLayout>
              <Suspense fallback={<Backdrop />}>
                <Routes>
                  {mainRoutes.map(({ path, exact, element }, i) => {
                    return <Route key={i} exact={exact} path={path} element={element} />;
                  })}
                </Routes>
              </Suspense>
            </MainLayout>
          </ThemeProvider>
        </BrowserRouter>
      </ProvideGlobal>
    </DAppProvider>
  );
}

export default App;
