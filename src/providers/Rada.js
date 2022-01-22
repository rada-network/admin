import { createContext, useContext } from "react";
import { useGlobal } from "./Global";
import { useParams } from "react-router-dom";
import useABI from "hooks/useABI";

import RadaAuction from "model/RadaAuction";
import RadaAuctionStats from "model/RadaAuctionStats";
import useDataCalls from "hooks/useDataCalls";

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
    calls.push({
      ...callData,
      ...{ method: "pools", args: [id] },
    });

    calls.push({
      ...callData,
      ...{ method: "poolStats", args: [id] },
    });
  }

  const contractChain = useDataCalls(calls).filter((a) => a) ?? [];

  if (contractChain.length < 1) {
    return "Loading...";
  }

  contractChain.forEach((chain, i) => {
    if (chain[0]) {
      switch (i) {
        case 0:
          provideValue.isAdmin = chain[0];

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
          provideValue.pool = RadaAuction(chain[0], id);

          break;

        case 4:
          provideValue.poolStat = RadaAuctionStats(chain[0]);

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

  console.log("ProvideRada render", provideValue, contractChain);

  return <radaContext.Provider value={provideValue}>{children}</radaContext.Provider>;
};

const useRada = () => {
  return useContext(radaContext);
};

export { ProvideRada, useRada };
