import { createContext, useContext } from "react";
import { useEthers } from "@usedapp/core";

const authContext = createContext();

const ProvideAuth = ({ children }) => {
  const { activateBrowserWallet, account } = useEthers();

  if (!account) {
    activateBrowserWallet();
    return "Connecting...";
  }

  console.log("ProvideAuth render");

  return <authContext.Provider value={account}>{children}</authContext.Provider>;
};

const useAuth = () => {
  return useContext(authContext);
};

export { ProvideAuth, useAuth };
