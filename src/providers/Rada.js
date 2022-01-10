import { createContext, useContext } from "react";
import { useGlobal } from "./Global";
import { useParams } from "react-router-dom";
import useABI from "hooks/useABI";
import { useContractCalls } from "@usedapp/core";
import RadaAuction from "model/RadaAuction";
import RadaAuctionStats from "model/RadaAuctionStats";

const radaContext = createContext();

const ProvideRada = ({ children }) => {
  const global = useGlobal();
  const { type, id } = useParams();

  const { contractABI, contractAddress, contractName, contractType, contractInstance } =
    useABI(type);

  const provideValue = {
    isAdmin: false,
    isOwner: false,
    contractName: contractName,
    contractType: contractType,
    contractInstance: contractInstance,
    pool: null,
    poolStat: null,
    poolIds: [],
  };

  const callData = {
    address: contractAddress,
    abi: contractABI,
  };

  let calls = [
    {
      ...callData,
      ...{ method: "admins", args: [global.account] },
    },
    {
      ...callData,
      ...{ method: "owner", args: [] },
    },
    {
      ...callData,
      ...{ method: "getPoolIds", args: [] },
    },
  ];

  if (id) {
    calls.push({
      ...callData,
      ...{ method: "pools", args: [id] },
    });

    calls.push({
      ...callData,
      ...{ method: "poolStats", args: [id] },
    });
  }

  const contractChain = useContractCalls(calls).filter((a) => a) ?? [];

  if (contractChain.length < 3) {
    return "Loading....";
  }

  contractChain.forEach((chain, i) => {
    if (chain) {
      switch (i) {
        case 0:
          provideValue.isAdmin = true;

          break;

        case 1:
          if (chain[0] === global.account) {
            provideValue.isOwner = true;
          }

          break;

        case 2:
          provideValue.poolIds = chain[0];

          break;
        case 3:
          provideValue.pool = RadaAuction(chain, id);

          break;

        case 4:
          provideValue.poolStat = RadaAuctionStats(chain);

          break;

        default:
          break;
      }
    }
  });

  //global.handleType(provideValue);

  if (!provideValue.isAdmin) {
    return "Ops...You are not a admin";
  }

  console.log("ProvideRada render", provideValue);

  return <radaContext.Provider value={provideValue}>{children}</radaContext.Provider>;
};

const useRada = () => {
  return useContext(radaContext);
};

export { ProvideRada, useRada };
