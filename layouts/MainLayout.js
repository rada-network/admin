import Head from "next/head";
import Header from "../components/Header";
import { Backdrop, CircularProgress, Container, CssBaseline, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import Router from "next/router";
import Notifications from "@components/Notifications";
import { useAuth } from "@hooks/useAuth";

export default function MainLayout({ children }) {
  const auth = useAuth();

  Router.onRouteChangeStart = () => {
    auth.setLoading(true);
  };

  Router.onRouteChangeComplete = () => {
    auth.setLoading(false);
  };

  Router.onRouteChangeError = () => {
    auth.setLoading(false);
  };

  console.log("MainLayout render", auth);

  return (
    <>
      <Head>
        <title>RADA - Admin</title>
        <meta name="description" content="RADA - Admin" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
            {children}
          </Container>
        </Box>
        <Notifications />
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={auth.loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </>
  );
}
