import { createContext, useContext } from "react";

import PoolModel from "model/Pool";
import { useGlobal } from "./Global";
import { useParams } from "react-router-dom";
import useABI from "hooks/useABI";
import { useContractCalls } from "@usedapp/core";

const poolsContext = createContext();

const ProvidePools = ({ children }) => {
  const global = useGlobal();
  const { type } = useParams();

  const { contractABI, contractAddress, contractName, contractType, contractInstance } = useABI(
    type ?? "poolClaim"
  );

  const provideValue = {
    isAdmin: false,
    isApprovers: false,
    pools: [],
    contractName: contractName,
    contractType: contractType,
    contractInstance: contractInstance,
  };

  const callData = {
    address: contractAddress,
    abi: contractABI,
  };

  const contractChain =
    useContractCalls([
      {
        ...callData,
        ...{ method: "admins", args: [global.account] },
      },
      {
        ...callData,
        ...{ method: "approvers", args: [global.account] },
      },
      {
        ...callData,
        ...{ method: "getPools", args: [] },
      },
    ]).filter((a) => a) ?? [];

  if (contractChain.length < 3) {
    return "Loading....";
  }

  contractChain.forEach((chain, i) => {
    if (chain[0]) {
      switch (i) {
        case 0:
          provideValue.isAdmin = true;

          break;

        case 1:
          provideValue.isApprovers = true;

          break;

        case 2:
          provideValue.pools = chain[0]?.map((pool, i) => PoolModel(pool, i));
          provideValue.pools = provideValue.pools.filter( function(pool) {
            return parseInt(pool.allocationBusd) > 1
          })
          break;

        default:
          break;
      }
    }
  });

  global.handleType(provideValue);

  console.log("ProvidePools render", provideValue, contractChain);

  if (!provideValue.isAdmin && !provideValue.isApprovers) {
    return "Ops...You are not an admin or approver";
  }

  return <poolsContext.Provider value={provideValue}>{children}</poolsContext.Provider>;
};

const usePools = () => {
  return useContext(poolsContext);
};

export { ProvidePools, usePools };
