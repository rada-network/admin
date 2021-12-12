import { utils } from "ethers";

import BEP20 from "../config/abi/BEP20.json";

import poolClaim from "../config/abi/PoolClaim.json";
import poolRIR from "../config/abi/PoolRIR.json";
import poolWhitelist from "../config/abi/PoolWhitelist.json";

import {
  useContractCalls as useContractCallsCore,
  useEthers,
  useContractFunction as useContractFunctionCore,
} from "@usedapp/core";

import { Contract } from "@ethersproject/contracts";

const useContractCalls = (methods) => {
  const calls = methods.map((method) => ({
    address: method.contract,
    method: method.method,
    args: method.args ?? [],
    abi: method.abi,
  }));

  const val = useContractCallsCore(calls) ?? [];

  console.log("useContractCalls", calls, val);

  return val?.filter((a) => a);
};

const useContract = (contractAddress, abi = "BEP20") => {
  const { library } = useEthers();
  const abiInterface = getABI(abi);

  console.log("useContract", contractAddress, abiInterface);

  return new Contract(contractAddress, abiInterface, library);
};

const useContractFunction = (contract, method) => {
  const { state, send } = useContractFunctionCore(contract, method, {
    transactionName: method,
  });

  console.log("useContractFunction", method, state);

  return [state, send];
};

const getABI = (abi = "launchVerse") => {
  let abiInterface = new utils.Interface(BEP20);

  switch (abi) {
    case "BEP20":
      abiInterface = new utils.Interface(BEP20);
      break;

    case "poolClaim":
      abiInterface = new utils.Interface(poolClaim);
      break;

    case "poolRIR":
      abiInterface = new utils.Interface(poolRIR);
      break;

    case "poolWhitelist":
      abiInterface = new utils.Interface(poolWhitelist);
      break;

    default:
      break;
  }

  return abiInterface;
};

export { useContractCalls, useContract, useContractFunction };
