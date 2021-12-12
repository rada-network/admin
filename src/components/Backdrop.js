import { CircularProgress, Backdrop as BackdropCore } from "@mui/material";
import { useGlobal } from "providers/Global";

export default function Backdrop() {
  const global = useGlobal();
  console.log("Backdrop render...", global);

  return (
    <BackdropCore sx={{ color: "#fff", zIndex: () => 9999 }} open={global.loading}>
      <CircularProgress color="inherit" />
    </BackdropCore>
  );
}

Backdrop.defaultProps = {
  loading: false,
};
