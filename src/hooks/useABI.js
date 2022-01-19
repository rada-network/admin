import { utils } from "ethers";
import BEP20 from "../config/abi/BEP20.json";
import poolClaim from "../config/abi/PoolClaim.json";
import poolRIR from "../config/abi/PoolRIR.json";
import poolWhitelist from "../config/abi/PoolWhitelist.json";
import radaAuction from "../config/abi/RadaAuction.json";
import radaFixedSwap from "../config/abi/RadaFixedSwap.json";
import nftAuction from "../config/abi/NFTAuction.json";
import nftFixedSwap from "../config/abi/NFTFixedSwap.json";

import openbox from "../config/abi/OpenBox.json";
import { Contract } from "@ethersproject/contracts";
import { useEthers } from "@usedapp/core";

const useABI = (contractType) => {
  const { library } = useEthers();
  let contractABI = new utils.Interface(BEP20);
  let contractAddress = "";
  let contractName = "BEP20";
  let contractInstance = null;

  switch (contractType) {
    case "poolClaim":
      contractABI = new utils.Interface(poolClaim);
      contractAddress = process.env.REACT_APP_POOLCLAIM_CONTRACT;
      contractName = "Only Claim Pools";

      break;

    case "poolRIR":
      contractABI = new utils.Interface(poolRIR);
      contractAddress = process.env.REACT_APP_POOLRIR_CONTRACT;
      contractName = "RIR Pools";
      break;

    case "poolWhitelist":
      contractABI = new utils.Interface(poolWhitelist);
      contractAddress = process.env.REACT_APP_POOLWHITELIST_CONTRACT;
      contractName = "Whitelist Pools";
      break;

    case "radaAuction":
      contractABI = new utils.Interface(radaAuction);
      contractAddress = process.env.REACT_APP_RADAAUCTION_CONTRACT;
      contractName = "RADA Auction";
      break;

    case "radaFixedSwap":
      contractABI = new utils.Interface(radaFixedSwap);
      contractAddress = process.env.REACT_APP_RADAFIXEDSWAP_CONTRACT;
      contractName = "RADA FixedSwap";
      break;

    case "nftAuction":
      contractABI = new utils.Interface(nftAuction);
      contractAddress = process.env.REACT_APP_NFTAUCTION_CONTRACT;
      contractName = "NFT Auction";
      break;

    case "nftFixedSwap":
      contractABI = new utils.Interface(nftFixedSwap);
      contractAddress = process.env.REACT_APP_NTFFIXEDSWAP_CONTRACT;
      contractName = "NFT FixedSwap";
      break;

    case "openbox":
      contractABI = new utils.Interface(openbox);
      contractAddress = process.env.REACT_APP_OPENBOX_CONTRACT;
      contractName = "Open Box Pools";
      break;

    default:
      break;
  }

  if (contractAddress) {
    contractInstance = new Contract(contractAddress, contractABI, library);
  }

  return { contractABI, contractAddress, contractType, contractName, contractInstance };
};

export default useABI;
