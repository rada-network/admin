import { useEthers } from "@usedapp/core";

import { Contract } from "@ethersproject/contracts";
import useABI from "./useABI";

const useContract = (contractAddress) => {
  const { library } = useEthers();
  const { contractABI } = useABI();

  console.log("useContract", contractAddress, contractABI);

  return new Contract(contractAddress, contractABI, library);
};

export { useContract };
