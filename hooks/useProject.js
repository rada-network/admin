import { createContext, useContext } from "react";
import { useContract } from "./useContract";

const projectContext = createContext();

const ProvideProject = ({ children, contract }) => {
  const tokenAddress = useContract("tokenAddress");

  return (
    <projectContext.Provider value={{ tokenAddress: tokenAddress, contract: contract }}>
      {children}
    </projectContext.Provider>
  );
};

const useProject = () => {
  return useContext(projectContext);
};

export { ProvideProject, useProject };
