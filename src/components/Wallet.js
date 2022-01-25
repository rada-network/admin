import { Stack, Typography } from "@mui/material";
import { shortenAddress } from "@usedapp/core";
import { isPolygon } from "config/Chain";
import { useGlobal } from "providers/Global";
import { useEthers } from "@usedapp/core";

export default function Wallet() {
  const global = useGlobal();
  const { chainId } = useEthers();

  // const handleChange = async () => {
  //   // Check if MetaMask is installed
  //   // MetaMask injects the global API into window.ethereum
  //   if (window.ethereum) {
  //     try {
  //       // check if the chain to connect to is installed
  //       await window.ethereum.request({
  //         method: "wallet_switchEthereumChain",
  //         params: [{ chainId: hexChainId(chainId) }], // chainId must be in hexadecimal numbers
  //       });
  //     } catch (error) {
  //       // This error code indicates that the chain has not been added to MetaMask
  //       // if it is not, then install it into the user MetaMask
  //       if (error.code === 4902) {
  //         try {
  //           await window.ethereum.request({
  //             method: "wallet_addEthereumChain",
  //             params: [
  //               {
  //                 chainId: hexChainId(chainId),
  //                 chainName: "mumbai",
  //                 rpcUrls: ["https://rpc-mumbai.matic.today"],
  //               },
  //             ],
  //           });
  //         } catch (addError) {
  //           console.error(addError);
  //         }
  //       }
  //       console.error(error);
  //     }
  //   } else {
  //     // if no window.ethereum then MetaMask is not installed
  //     alert(
  //       "MetaMask is not installed. Please consider installing it: https://metamask.io/download.html"
  //     );
  //   }
  // };

  if (!global.account) {
    return null;
  }

  console.log("Wallet render...", global.account);

  return (
    <Stack direction="row" spacing={2} sx={{ justifyContent: "flex-end", alignItems: "center" }}>
      <Typography>
        {isPolygon(chainId) ? "Polygon" : "BSC"}: {shortenAddress(global.account)}
      </Typography>

      {/* <Button variant="contained" color="success" onClick={() => handleChange()}>
        Change to {isPolygon(chainId) ? "BSC" : "Polygon"}
      </Button> */}
    </Stack>
  );
}
