import { ethers, utils } from "ethers";
import launchVerse from "../config/abi/LaunchVerse.json";
import BEP20 from "../config/abi/BEP20.json";

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
  console.log("useContractFunction", contract, method);
  const { state, send } = useContractFunctionCore(contract, method, {
    transactionName: method,
  });

  console.log(state);

  return [state, send];
};

export { useContractCalls, useContract, useContractFunction, useContractBEP20 };
