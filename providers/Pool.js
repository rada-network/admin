import { useRouter } from "next/router";
import { createContext, useContext } from "react";
import { useAuth } from "@hooks/useAuth";

import { useContract, useContractCalls } from "@hooks/useContract";

import PoolModel from "@model/Pool";

const poolContext = createContext();

const ProvidePool = ({ children }) => {
  const { query } = useRouter();

  if (!query.slug) {
    return "Ops..";
  }

  const auth = useAuth();
  const contractInstance = useContract(process.env.NEXT_PUBLIC_POOLS_CONTRACT, "pool");

  const provideValue = {
    contractInstance: contractInstance,
    isAdmin: false,
    isOwner: false,
    pool: null,
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
          if (chain[0][query.slug]) {
            provideValue.pool = PoolModel(chain[0][query.slug], query.slug);
          }

          break;

        default:
          break;
      }
    }
  });

  if (!provideValue.pool || (!provideValue.isAdmin && !provideValue.isOwner)) {
    return "Ops...";
  }

  console.log("ProvidePool", provideValue, contractChain);

  return <poolContext.Provider value={provideValue}>{children}</poolContext.Provider>;
};

const usePool = () => {
  return useContext(poolContext);
};

export { ProvidePool, usePool };
