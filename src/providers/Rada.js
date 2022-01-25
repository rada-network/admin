import { createContext, useContext } from "react";
import { useGlobal } from "./Global";
import { useParams } from "react-router-dom";
import useABI from "hooks/useABI";

import RadaAuctionModel from "model/RadaAuction";
import RadaAuctionStats from "model/RadaAuctionStats";
import useDataCalls from "hooks/useDataCalls";
import { addressEqual } from "@usedapp/core";
import useDecimals from "hooks/useDecimals";

const radaContext = createContext();

const ProvideRada = ({ children }) => {
  const global = useGlobal();
  const { type, id } = useParams();

  const { contractABI, contractAddress, contractName, contractType, contractInstance } =
    useABI(type);

  const getDecimals = useDecimals(id);

  const provideValue = {
    isAdmin: false,
    isOwner: false,
    contractName: contractName,
    contractType: contractType,
    contractInstance: contractInstance,
    contractABI: contractABI,
    pool: null,
    poolStat: null,
    poolIds: [],
    whitelistIds: [],
  };

  const callData = {
    address: contractAddress,
    abi: contractABI,
    sender: global.account,
  };

  let calls = [
    {
      ...callData,
      ...{ method: "isAdmin", args: [global.account] },
    },
    {
      ...callData,
      ...{ method: "owner" },
    },
    {
      ...callData,
      ...{ method: "getPoolIds" },
    },
  ];

  if (id) {
    if (contractType === "nftClaim" || contractType === "randomizeByRarity") {
      calls.push({
        ...callData,
        ...{ method: "getPool", args: [id] },
      });
    } else {
      calls.push({
        ...callData,
        ...{ method: "pools", args: [id] },
      });

      calls.push({
        ...callData,
        ...{ method: "poolStats", args: [id] },
      });

      calls.push({
        ...callData,
        ...{ method: "getWhitelistIds", args: [id] },
      });
    }
  }

  const contractChain = useDataCalls(calls).filter((a) => a) ?? [];

  if (contractChain.length < 2 || (id && getDecimals)) {
    return "Loading...";
  }

  contractChain.forEach(async (chain, i) => {
    if (chain[0]) {
      switch (i) {
        case 0:
          provideValue.isAdmin = chain[0];

          break;

        case 1:
          if (addressEqual(chain[0], global.account)) {
            provideValue.isOwner = true;
          }

          break;

        case 2:
          provideValue.poolIds = chain[0];

          break;
        case 3:
          provideValue.pool = RadaAuctionModel(chain[0], id);

          break;

        case 4:
          provideValue.poolStat = RadaAuctionStats(chain[0]);
          break;

        case 5:
          provideValue.whitelistIds = chain[0];

          break;

        default:
          break;
      }
    }
  });

  console.log("ProvideRada render", provideValue, contractChain);

  if (!provideValue.isAdmin && !provideValue.isOwner) {
    return "Ops...You are not an admin or owner";
  }

  return <radaContext.Provider value={provideValue}>{children}</radaContext.Provider>;
};

const useRada = () => {
  return useContext(radaContext);
};

export { ProvideRada, useRada };
