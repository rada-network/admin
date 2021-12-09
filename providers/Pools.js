import { createContext, useContext } from "react";
import { useAuth } from "@hooks/useAuth";
import { useContract, useContractCalls } from "@hooks/useContract";

import PoolModel from "@model/Pool";

const poolsContext = createContext();

const ProvidePools = ({ children }) => {
  const auth = useAuth();
  const contractInstance = useContract(process.env.NEXT_PUBLIC_POOLS_CONTRACT, "pool");

  const provideValue = {
    contractInstance: contractInstance,
    isAdmin: false,
    isOwner: false,
    pools: [],
  };

  const contractChain = useContractCalls([
    {
      method: "admins",
      args: [auth.account],
      contract: process.env.NEXT_PUBLIC_POOLS_CONTRACT,
    },
    {
      method: "owner",
      args: [],
      contract: process.env.NEXT_PUBLIC_POOLS_CONTRACT,
    },
    {
      method: "getPools",
      args: [],
      contract: process.env.NEXT_PUBLIC_POOLS_CONTRACT,
      abi: "pool",
    },
  ]);

  if (contractChain.length === 0) {
    return "Connecting....";
  }

  contractChain.forEach((chain, i) => {
    if (chain[0]) {
      switch (i) {
        case 0:
          provideValue.isAdmin = true;
          break;

        case 1:
          if (chain[0] === auth.account) {
            provideValue.isOwner = true;
          }

          break;

        case 2:
          provideValue.pools = chain[0]?.map((pool) => PoolModel(pool));

          break;

        default:
          break;
      }
    }
  });

  if (!provideValue.isAdmin && !provideValue.isOwner) {
    return "Ops...";
  }

  console.log("ProvidePools render", provideValue, contractChain);

  return <poolsContext.Provider value={provideValue}>{children}</poolsContext.Provider>;
};

const usePools = () => {
  return useContext(poolsContext);
};

export { ProvidePools, usePools };
