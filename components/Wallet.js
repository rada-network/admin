import { Button } from "@mui/material";
import { formatAddress } from "utils/format";
import { useAuth } from "../hooks/useAuth";

export default function Wallet() {
  const account = useAuth();

  if (!account) {
    return null;
  }

  console.log("Wallet render...", account);

  return (
    <>
      <Button variant="contained">Address: {formatAddress(account)}</Button>
    </>
  );
}
