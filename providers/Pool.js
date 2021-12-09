import { useRouter } from "next/router";
import { createContext, useContext } from "react";
import { useAuth } from "@hooks/useAuth";

const poolContext = createContext();

const ProvidePool = ({ children }) => {
  const auth = useAuth();
  const { query } = useRouter();

  console.log("ProvidePool", query);

  return <poolContext.Provider>{children}</poolContext.Provider>;
};

const usePool = () => {
  return useContext(poolContext);
};

export { ProvidePool, usePool };
