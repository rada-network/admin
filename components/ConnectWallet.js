import { Button } from "@mui/material";
import { useAuth } from "../hooks/useAuth";

export default function ConnectWallet() {
  const auth = useAuth();
  console.log("ConnectWallet render...", auth);

  if (!auth.address) {
    return null;
  }

  return (
    <>
      <Button variant="contained">
        Address: {`${auth.address.substring(0, 4)}...${auth.address.slice(-4)}`}
      </Button>
    </>
  );
}
