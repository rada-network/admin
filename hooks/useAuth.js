import { createContext, useContext } from "react";

import { useEthers } from "@usedapp/core";
import { useContract } from "./useContract";

const authContext = createContext();

const ProvideAuth = ({ children }) => {
  const { activateBrowserWallet, account } = useEthers();
  const contract = "0x3cd89c8347B364697Ddf9d45Cd32813BE7309Bf6";
  const isAdmin = useContract("admins", contract, [account]);

  if (!account) {
    activateBrowserWallet();
    return "Connecting...";
  }

  if (!isAdmin) {
    return "Connecting...";
  }

  console.log("ProvideAuth render", contract, isAdmin);

  return <authContext.Provider value={account}>{children}</authContext.Provider>;
};

const useAuth = () => {
  return useContext(authContext);
};

export { ProvideAuth, useAuth };
