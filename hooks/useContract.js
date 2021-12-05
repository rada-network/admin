import { ethers, utils } from "ethers";
import launchpadAbiV2 from "../config/abi/launchpadv2.json";
import {
  useContractCalls,
  useEthers,
  useContractFunction as useContractFunctionCore,
} from "@usedapp/core";
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

const useContract = (contractAddress) => {
  const { library } = useEthers();
  let abi = new utils.Interface(launchpadAbiV2);

  return new Contract(contractAddress, abi, library);
};

const useContractFunction = (contract, method) => {
  const { state, send } = useContractFunctionCore(contract, method, {
    transactionName: method,
  });

  console.log(state);

  return [state, send];
};

export { useCallContract, useContract, useContractFunction };
