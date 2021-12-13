import { createContext, useContext } from "react";

import { useContractCalls } from "@usedapp/core";

import { useGlobal } from "./Global";
import PoolModel from "model/Pool";
import { useParams } from "react-router-dom";
import useABI from "hooks/useABI";

const poolContext = createContext();

const ProvidePool = ({ children }) => {
  const global = useGlobal();
  const { type, id } = useParams();

  const { contractABI, contractAddress, contractName, contractType, contractInstance } = useABI(
    type ?? "poolClaim"
  );

  const provideValue = {
    id: id,
    isAdmin: false,
    isApprover: false,
    pool: {},
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
        ...{ method: "getPool", args: [id] },
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
          provideValue.isApprover = true;

          break;

        case 2:
          provideValue.pool = PoolModel(chain[0], id);
          break;
        default:
          break;
      }
    }
  });

  if (!provideValue.pool || (!provideValue.isApprover && !provideValue.isAdmin)) {
    return "Ops...";
  }

  console.log("ProvidePool render", provideValue);

  return <poolContext.Provider value={provideValue}>{children}</poolContext.Provider>;
};

const usePool = () => {
  return useContext(poolContext);
};

export { ProvidePool, usePool };
