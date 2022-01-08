import { createContext, useContext } from "react";
import { useGlobal } from "./Global";
import { useParams } from "react-router-dom";
import useABI from "hooks/useABI";
import { useContractCalls } from "@usedapp/core";
import RadaAuctionModel from "model/RadaAuction";

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
  ];

  if (id) {
    calls.push({
      ...callData,
      ...{ method: "pools", args: [id] },
    });
  }

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
          if (chain[0] === global.account) {
            provideValue.isOwner = true;
          }

          break;

        case 2:
          provideValue.pool = RadaAuctionModel(chain, id);

          break;

        default:
          break;
      }
    }
  });

  global.handleType(provideValue);

  console.log("ProvideRadaAuction render", provideValue, id);

  if (!provideValue.isAdmin) {
    return "Ops...You are not a admin";
  }

  return <radaAuctionContext.Provider value={provideValue}>{children}</radaAuctionContext.Provider>;
};

const useRadaAuction = () => {
  return useContext(radaAuctionContext);
};

export { ProvideRadaAuction, useRadaAuction };
