import { createContext, useContext, useState } from "react";
import { useEthers } from "@usedapp/core";
import { useCallback } from "react";

const globalContext = createContext();

const ProvideGlobal = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState();

  const { activateBrowserWallet, account } = useEthers();

  const handleType = useCallback((provideValue) => {
    console.log("handleType", provideValue);
    if (provideValue.isAdmin) {
      setType("Admin");
    }

    if (provideValue.isApprovers) {
      setType("Approver");
    }
  }, []);

  if (!account) {
    activateBrowserWallet();
    return "Connecting...";
  }

  console.log("ProvideGlobal render", loading, type);

  return (
    <globalContext.Provider
      value={{
        account: account,
        loading: loading,
        type: type,
        handleType: handleType,
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
