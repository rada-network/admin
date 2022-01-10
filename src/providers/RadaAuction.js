import { createContext, useContext } from "react";
import { useGlobal } from "./Global";
import { useParams } from "react-router-dom";
import useABI from "hooks/useABI";
import { useContractCalls } from "@usedapp/core";
import RadaAuctionModel from "model/RadaAuction";
import RadaAuctionStatsModel from "model/RadaAuctionStats";

const radaAuctionContext = createContext();

const ProvideRadaAuction = ({ children }) => {
  const global = useGlobal();
  const { id } = useParams();

  const { contractABI, contractAddress, contractName, contractType, contractInstance } =
    useABI("radaAuction");

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
          provideValue.pool = RadaAuctionModel(chain, id);

          break;

        case 4:
          provideValue.poolStat = RadaAuctionStatsModel(chain);

          break;

        default:
          break;
      }
    }
  });

  global.handleType(provideValue);

  if (!provideValue.isAdmin) {
    return "Ops...You are not a admin";
  }

  console.log("ProvideRadaAuction render", provideValue);

  return <radaAuctionContext.Provider value={provideValue}>{children}</radaAuctionContext.Provider>;
};

const useRadaAuction = () => {
  return useContext(radaAuctionContext);
};

export { ProvideRadaAuction, useRadaAuction };
