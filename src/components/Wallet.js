import { Button, Stack, Typography } from "@mui/material";
import { shortenAddress } from "@usedapp/core";
import { hexChainId, isPolygon } from "config/Chain";
import { useGlobal } from "providers/Global";
import { useEthers } from "@usedapp/core";

export default function Wallet() {
  const global = useGlobal();
  const { chainId } = useEthers();

  const handleChange = async () => {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: hexChainId(chainId) }], // chainId must be in hexadecimal numbers
    });
  };

  if (!global.account) {
    return null;
  }

  console.log("Wallet render...", global.account);

  return (
    <Stack direction="row" spacing={2} sx={{ justifyContent: "flex-end", alignItems: "center" }}>
      <Typography>
        {isPolygon(chainId) ? "Polygon" : "BSC"}: {shortenAddress(global.account)}
      </Typography>

      <Button variant="contained" color="success" onClick={() => handleChange()}>
        Change to {isPolygon(chainId) ? "BSC" : "Polygon"}
      </Button>
    </Stack>
  );
}
