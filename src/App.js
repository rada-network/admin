import React, { Fragment, Suspense } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { mainRoutes } from "./routes";
import Header from "./components/Header";
import { Container, CssBaseline, Toolbar } from "@mui/material";
import { Box } from "@mui/system";

function App() {
  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <Header />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Suspense fallback={<Fragment />}>
                <Routes>
                  {mainRoutes.map(({ path, exact, element }, i) => {
                    return <Route key={i} exact={exact} path={path} element={element} />;
                  })}
                </Routes>
              </Suspense>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
