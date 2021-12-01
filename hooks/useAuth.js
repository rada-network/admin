import { createContext, useState, useEffect, useContext } from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";

const providerOptions = {};

const authContext = createContext();

export function ProvideAuth({ children }) {
  const [state, setState] = useState(false);
  const auth = useProvideAuth();

  useEffect(() => {
    const login = async () => {
      const state = await auth.login();
      setState(state);
    };

    login();
  }, []);

  if (!state) {
    return "Connecting...";
  }

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
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
      return true;
    } catch (error) {
      console.log("login", error);
      return false;
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
