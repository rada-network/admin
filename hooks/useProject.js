const { createContext, useContext } = require("react");

const projectContext = createContext();

const ProvideProject = ({ children, contract }) => {
  return <projectContext.Provider value={contract}>{children}</projectContext.Provider>;
};

const useProject = () => {
  return useContext(projectContext);
};

export { ProvideProject, useProject };
