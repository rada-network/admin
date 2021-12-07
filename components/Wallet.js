import { Button } from "@mui/material";
import { formatAddress } from "utils/format";
import { useAuth } from "../hooks/useAuth";

export default function Wallet() {
  const auth = useAuth();

  if (!auth.account) {
    return null;
  }

  console.log("Wallet render...", auth.account);

  return (
    <>
      <Button variant="contained">Address: {formatAddress(auth.account)}</Button>
    </>
  );
}
