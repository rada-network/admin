import { createContext, useContext, useState } from "react";
import { useEthers } from "@usedapp/core";

const globalContext = createContext();

const ProvideGlobal = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const { activateBrowserWallet, account } = useEthers();

  if (!account) {
    activateBrowserWallet();
    return "Connecting...";
  }

  console.log("ProvideGlobal render", loading);
  return (
    <globalContext.Provider
      value={{
        account: account,
        loading: loading,
        setLoading: setLoading,
      }}
    >
      {children}
    </globalContext.Provider>
  );
};

const useGlobal = () => {
  return useContext(globalContext);
};

export { ProvideGlobal, useGlobal };
