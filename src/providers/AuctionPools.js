import { useContractCalls } from "@usedapp/core";
import useABI from "hooks/useABI";
import useDataCalls from "hooks/useDataCalls";
import { createContext, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGlobal } from "./Global";

const auctionContext = createContext();

const ProvideAuction = ({ children }) => {
  const global = useGlobal();
  const { type } = useParams();

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

  // const contractChain =
  //   useDataCalls([
  //     {
  //       ...callData,
  //       ...{ method: "isAdmin", args: [global.account] },
  //     },
  //     {
  //       ...callData,
  //       ...{ method: "owner" },
  //     },
  //     {
  //       ...callData,
  //       ...{ method: "getPoolIds" },
  //     },
  //   ]).filter((a) => a) ?? [];

  // if (contractChain.length < 3) {
  //   return "Loading....";
  // }

  // contractChain.forEach((chain, i) => {
  //   if (chain) {
  //     switch (i) {
  //       case 0:
  //         provideValue.isAdmin = chain;

  //         break;

  //       case 1:
  //         if (chain === global.account) {
  //           provideValue.isOwner = true;
  //         }

  //         break;

  //       case 2:
  //         provideValue.poolIds = chain;

  //         break;

  //       default:
  //         break;
  //     }
  //   }
  // });

  // if (!provideValue.isAdmin) {
  //   return "Ops...You are not a admin";
  // }

  console.log("ProvideAuction render", provideValue);

  return <auctionContext.Provider value={provideValue}>{children}</auctionContext.Provider>;
};

const useAuction = () => {
  return useContext(auctionContext);
};

export { ProvideAuction, useAuction };
