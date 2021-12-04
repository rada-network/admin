import { ethers, utils } from "ethers";
import launchpadAbiV2 from "../config/abi/launchpadv2.json";
import { useContractCalls, useEthers } from "@usedapp/core";
import { Contract } from "@ethersproject/contracts";

const useCallContract = (methods) => {
  if (methods.length === 0) {
    return [];
  }

  const base = {
    abi: new ethers.utils.Interface(launchpadAbiV2),
    address: process.env.NEXT_PUBLIC_CONTRACT,
  };

  const calls = methods.map((method) => ({
    ...base,
    ...{ method: method.method, args: method.args ?? [] },
  }));

  const [val] = useContractCalls(calls) ?? [];

  console.log("useCallContract", calls, val);

  return val;
};

const useContact = (contractAddress) => {
  const { library } = useEthers();
  let abi = new utils.Interface(launchpadAbiV2);

  return new Contract(contractAddress, abi, library);
};

export { useCallContract, useContact };
