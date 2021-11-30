import { createTheme, ThemeProvider } from "@mui/material/styles";
import Router from "next/router";
import MainLayout from "../layouts/MainLayout";
import { ProvideAuth } from "../hooks/useAuth";
import NProgress from "nprogress";
import "../styles/global.scss";

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
  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ProvideAuth>
      <ThemeProvider theme={theme}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ThemeProvider>
    </ProvideAuth>
  );
}

export default MyApp;
