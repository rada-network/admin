import { Button } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import Address from "./Address";

export default function Wallet() {
  const account = useAuth();

  if (!account) {
    return null;
  }

  console.log("Wallet render...", account);

  return (
    <>
      <Button variant="contained">
        Address: <Address value={account} />
      </Button>
    </>
  );
}
