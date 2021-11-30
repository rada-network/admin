import { createContext, useState, useEffect, useContext } from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";

const providerOptions = {};

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();

  return auth.login() ? <authContext.Provider value={auth}>{children}</authContext.Provider> : null;
}

export const useAuth = () => {
  return useContext(authContext);
};

export const useProvideAuth = () => {
  const [address, setAddress] = useState(null);

  const login = async () => {
    try {
      const web3Modal = new Web3Modal({
        network: "testnet",
        cachedProvider: true,
        providerOptions,
      });

      const provider = await web3Modal.connect();

      await subscribeProvider(provider);

      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();

      setAddress(accounts[0]);
    } catch (error) {
      console.log("login", error);
    }
  };

  console.log(address);

  return { address, login };
};

const subscribeProvider = async (provider) => {
  if (!provider.on) {
    return;
  }

  provider.on("disconnect", () => {
    console.log("disconnect");
  });

  provider.on("accountsChanged", async (accounts) => {
    console.log("accountsChanged", accounts);
  });

  provider.on("chainChanged", async (chainId) => {
    console.log("chainChanged", chainId);
  });
};
