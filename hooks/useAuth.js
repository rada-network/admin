import { createContext, useContext, useState, useEffect } from "react";
import { useEthers } from "@usedapp/core";
import { toast } from "react-toastify";

const authContext = createContext();

const ProvideAuth = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const { activateBrowserWallet, account } = useEthers();

  if (!account) {
    activateBrowserWallet(undefined, true);
    return "Connecting...";
  }

  console.log("ProvideAuth render", loading);
  return (
    <authContext.Provider
      value={{
        account: account,
        loading: loading,
        setLoading: setLoading,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

const useAuth = () => {
  return useContext(authContext);
};

export { ProvideAuth, useAuth };
