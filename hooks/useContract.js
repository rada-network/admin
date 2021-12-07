import { ethers, utils } from "ethers";
import launchVerse from "../config/abi/LaunchVerse.json";
import BEP20 from "../config/abi/BEP20.json";

import {
  useContractCalls as useContractCallsCore,
  useEthers,
  useContractFunction as useContractFunctionCore,
} from "@usedapp/core";
import { Contract } from "@ethersproject/contracts";
import { useAuth } from "./useAuth";
import { toast } from "react-toastify";

const useContractCalls = (methods) => {
  if (methods.length === 0) {
    return [];
  }

  try {
    const base = {
      abi: new ethers.utils.Interface(launchVerse),
    };

    const calls = methods.map((method) => ({
      ...base,
      ...{ address: method.contract, method: method.method, args: method.args ?? [] },
    }));

    const val = useContractCallsCore(calls) ?? [];

    console.log("useContractCalls", calls, val);

    return val?.filter((a) => a);
  } catch (error) {
    console.log("useContractCalls error", error);
    return null;
  }
};

const useContract = (contractAddress) => {
  const { library } = useEthers();
  let abi = new utils.Interface(launchVerse);

  return new Contract(contractAddress, abi, library);
};

const useContractBEP20 = (contractAddress) => {
  if (!contractAddress) {
    return null;
  }

  const { library } = useEthers();
  let abi = new utils.Interface(BEP20);

  return new Contract(contractAddress, abi, library);
};

const useContractFunction = (contract, method) => {
  const { state, send } = useContractFunctionCore(contract, method, {
    transactionName: method,
  });

  console.log("useContractFunction", state);

  return [state, send];
};

export { useContractCalls, useContract, useContractFunction, useContractBEP20 };
