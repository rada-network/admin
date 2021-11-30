import Head from "next/head";
import Header from "../components/Header";
import { Container, CssBaseline, Toolbar } from "@mui/material";
import { Box } from "@mui/system";

export default function MainLayout({ children }) {
  return (
    <>
      <Head>
        <title>RADA network - Admin</title>
        <meta name="description" content="RADA network - Admin" />
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
      </Box>
    </>
  );
}
