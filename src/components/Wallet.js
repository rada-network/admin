import { Typography } from "@mui/material";
import { shortenAddress } from "@usedapp/core";
import { useGlobal } from "providers/Global";

export default function Wallet() {
  const global = useGlobal();

  if (!global.account) {
    return null;
  }

  console.log("Wallet render...", global.account);

  return <Typography>{shortenAddress(global.account)}</Typography>;
}
