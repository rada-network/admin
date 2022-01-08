import { createContext, useContext } from "react";
import { useGlobal } from "./Global";

import useABI from "hooks/useABI";
import { useContractCalls } from "@usedapp/core";

const radaAuctionSettingsContext = createContext();

const ProvideRadaAuctionSettings = ({ children }) => {
  const global = useGlobal();

  const { contractABI, contractAddress, contractName, contractType, contractInstance } =
    useABI("radaAuction");

  const provideValue = {
    isOwner: false,
    contractName: contractName,
    contractType: contractType,
    contractInstance: contractInstance,
    WITHDRAW_ADDRESS: "",
  };

  const callData = {
    address: contractAddress,
    abi: contractABI,
  };

  let calls = [
    {
      ...callData,
      ...{ method: "owner", args: [] },
    },
    {
      ...callData,
      ...{ method: "WITHDRAW_ADDRESS", args: [] },
    },
  ];

  const contractChain = useContractCalls(calls).filter((a) => a) ?? [];

  if (contractChain.length < 2) {
    return "Loading....";
  }

  contractChain.forEach((chain, i) => {
    if (chain[0]) {
      switch (i) {
        case 0:
          provideValue.isAdmin = true;

          break;

        case 1:
          provideValue.WITHDRAW_ADDRESS = chain[0];

          break;

        default:
          break;
      }
    }
  });

  global.handleType(provideValue);

  console.log("ProvideRadaAuctionSettings render", provideValue);

  if (!provideValue.isAdmin) {
    return "Ops...You are not a admin";
  }

  return (
    <radaAuctionSettingsContext.Provider value={provideValue}>
      {children}
    </radaAuctionSettingsContext.Provider>
  );
};

const useRadaAuctionSettings = () => {
  return useContext(radaAuctionSettingsContext);
};

export { ProvideRadaAuctionSettings, useRadaAuctionSettings };
