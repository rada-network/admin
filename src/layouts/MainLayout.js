import Header from "components/Header";
import Backdrop from "components/Backdrop";
import Notifications from "components/Notifications";
import { Container, CssBaseline, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import { useGlobal } from "providers/Global";

export default function MainLayout({ children }) {
  const global = useGlobal();

  console.log("MainLayout render", global);

  return (
    <>
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

          <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
            {children}
          </Container>
        </Box>
        <Notifications />
        <Backdrop />
      </Box>
    </>
  );
}
