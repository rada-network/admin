import { createContext, useContext, useEffect } from "react";

import { useGlobal } from "./Global";
import useABI from "hooks/useABI";
import { useContractCalls, addressEqual } from "@usedapp/core";
import { useParams } from "react-router-dom";

const whiteListContext = createContext();

const ProvideWhitelist = ({ children }) => {
  const global = useGlobal();
  const { id } = useParams();

  const { contractABI, contractAddress, contractName, contractType, contractInstance } =
    useABI("whitelist");

  const provideValue = {
    isAdmin: false,
    isOwner: false,
    contractName: contractName,
    contractType: contractType,
    contractInstance: contractInstance,
    listId: [],
    listTitle: [],
    whitelistAddresses: [],
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
      ...{ method: "owner" },
    },
    {
      ...callData,
      ...{ method: "getList" },
    },
  ];

  if (id && id !== "add") {
    calls.push({
      ...callData,
      ...{ method: "listTitle", args: [id] },
    });

    calls.push({
      ...callData,
      ...{ method: "whitelistAddresses", args: [id] },
    });
  }

  const contractChain = useContractCalls(calls).filter((a) => a) ?? [];

  if (contractChain.length < 1) {
    return "Loading....";
  }

  contractChain.forEach((chain, i) => {
    if (chain[0]) {
      switch (i) {
        case 0:
          provideValue.isAdmin = true;

          break;

        case 1:
          if (addressEqual(chain[0], global.account)) {
            provideValue.isOwner = true;
          }

          break;

        case 2:
          provideValue.listId = chain[0];
          break;

        case 3:
          provideValue.listTitle = chain[0];
          break;

        case 4:
          provideValue.whitelistAddresses = chain[0];

          break;

        default:
          break;
      }
    }
  });

  console.log("ProvideWhitelist render", provideValue);

  if (!provideValue.isAdmin) {
    return "Ops...You are not a admin";
  }

  return <whiteListContext.Provider value={provideValue}>{children}</whiteListContext.Provider>;
};

const useWhitelist = () => {
  return useContext(whiteListContext);
};

export { ProvideWhitelist, useWhitelist };