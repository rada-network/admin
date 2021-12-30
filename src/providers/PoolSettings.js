import { createContext, useContext } from "react";

import { useGlobal } from "./Global";
import { useParams } from "react-router-dom";
import useABI from "hooks/useABI";
import { useContractCalls } from "@usedapp/core";

const poolSettingsContext = createContext();

const ProvidePoolSettings = ({ children }) => {
  const global = useGlobal();
  const { type, id } = useParams();

  const { contractABI, contractAddress, contractName, contractType, contractInstance } = useABI(
    type ?? "poolClaim"
  );

  const provideValue = {
    id: id,
    isAdmin: false,
    isApprover: false,
    isOwner: false,
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
        ...{ method: "owner", args: [] },
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
          if (chain[0] === global.account) {
            provideValue.isOwner = true;
          }
          break;

        default:
          break;
      }
    }
  });

  if (!provideValue.isApprover && !provideValue.isAdmin) {
    return "Ops...You are not a admin or approver";
  }

  console.log("ProvidePoolSettings", provideValue);

  return (
    <poolSettingsContext.Provider value={provideValue}>{children}</poolSettingsContext.Provider>
  );
};

const usePoolSettings = () => {
  return useContext(poolSettingsContext);
};

export { ProvidePoolSettings, usePoolSettings };
