import { createContext, useContext } from "react";
import { useContract } from "./useContract";

const projectContext = createContext();

const ProvideProject = ({ children, projectData }) => {
  const projectModel = ProjectModel(projectData);

  return <projectContext.Provider value={projectModel}>{children}</projectContext.Provider>;
};

const useProject = () => {
  return useContext(projectContext);
};

const ProjectModel = (projectData) => {
  console.log("ProjectModel", projectData);
  const contractInstance = useContract(projectData.swap_contract);

  return {
    title: projectData.content?.title ?? "",
    contract: projectData.swap_contract ?? "",
    contractInstance: contractInstance,
  };
};

export { ProvideProject, useProject };
