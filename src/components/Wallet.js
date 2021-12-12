import { Typography } from "@mui/material";
import { formatAddress } from "utils/format";
import { useGlobal } from "providers/Global";

export default function Wallet() {
  const global = useGlobal();

  if (!global.account) {
    return null;
  }

  console.log("Wallet render...", global.account);

  return <Typography>{formatAddress(global.account)}</Typography>;
}
