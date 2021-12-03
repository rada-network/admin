import { createContext, useContext } from "react";

import { useEthers } from "@usedapp/core";
import { useContract } from "./useContract";

const authContext = createContext();

const ProvideAuth = ({ children }) => {
  const { activateBrowserWallet, account } = useEthers();

  const isAdmin = useContract("admins", [account]);

  if (!account) {
    activateBrowserWallet();
    return "Connecting...";
  }

  if (!isAdmin) {
    return "Connecting...";
  }

  console.log("ProvideAuth render", isAdmin);

  return <authContext.Provider value={account}>{children}</authContext.Provider>;
};

const useAuth = () => {
  return useContext(authContext);
};

export { ProvideAuth, useAuth };
