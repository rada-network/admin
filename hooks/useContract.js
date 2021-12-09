import { ethers, utils } from "ethers";
import launchVerse from "../config/abi/LaunchVerse.json";
import BEP20 from "../config/abi/BEP20.json";
import pool from "../config/abi/Pool.json";

import {
  useContractCalls as useContractCallsCore,
  useEthers,
  useContractFunction as useContractFunctionCore,
} from "@usedapp/core";
import { Contract } from "@ethersproject/contracts";

const useContractCalls = (methods) => {
  if (methods.length === 0) {
    return [];
  }

  try {
    const calls = methods.map((method) => ({
      address: method.contract,
      method: method.method,
      args: method.args ?? [],
      abi: useABI(method.abi ?? "launchVerse"),
    }));

    const val = useContractCallsCore(calls) ?? [];

    console.log("useContractCalls", calls, val);

    return val?.filter((a) => a);
  } catch (error) {
    console.log("useContractCalls error", error);
    return null;
  }
};

const useContract = (contractAddress, abi = "launchVerse") => {
  if (!contractAddress) {
    return null;
  }

  const { library } = useEthers();

  const abiInterface = useABI(abi);

  return new Contract(contractAddress, abiInterface, library);
};

const useContractFunction = (contract, method) => {
  const { state, send } = useContractFunctionCore(contract, method, {
    transactionName: method,
  });

  console.log("useContractFunction", method, state);

  return [state, send];
};

const useABI = (abi = "launchVerse") => {
  let abiInterface = new utils.Interface(launchVerse);

  switch (abi) {
    case "BEP20":
      abiInterface = new utils.Interface(BEP20);
      break;

    case "pool":
      abiInterface = new utils.Interface(pool);
      break;

    default:
      break;
  }

  return abiInterface;
};

export { useContractCalls, useContract, useContractFunction };
