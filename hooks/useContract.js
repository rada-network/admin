import { ethers } from "ethers";
import launchpadAbiV2 from "../config/abi/launchpadv2.json";
import { useContractCall } from "@usedapp/core";

const useContract = (method, args = []) => {
  const [val] =
    useContractCall({
      abi: new ethers.utils.Interface(launchpadAbiV2),
      address: process.env.NEXT_PUBLIC_CONTRACT,
      method: method,
      args: args,
    }) ?? [];

  console.log("useContract", method, args, val);

  return val;
};

export { useContract };
