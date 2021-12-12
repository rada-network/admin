import { utils } from "ethers";
import BEP20 from "../config/abi/BEP20.json";
import poolClaim from "../config/abi/PoolClaim.json";
import poolRIR from "../config/abi/PoolRIR.json";
import poolWhitelist from "../config/abi/PoolWhitelist.json";
import { Contract } from "@ethersproject/contracts";
import { useEthers } from "@usedapp/core";

const useABI = (contractType) => {
  const { library } = useEthers();
  let contractABI = new utils.Interface(BEP20);
  let contractAddress = "";
  let contractName = "Pools";

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

    default:
      break;
  }

  const contractInstance = new Contract(contractAddress, contractABI, library);

  return { contractABI, contractAddress, contractType, contractName, contractInstance };
};

export default useABI;
