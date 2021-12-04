import { createContext, useContext } from "react";

const projectContext = createContext();

const ProvideProject = ({ children, projectData }) => {
  const projectModel = ProjectModel(projectData);
  return <projectContext.Provider value={projectModel}>{children}</projectContext.Provider>;
};

const useProject = () => {
  return useContext(projectContext);
};

const ProjectModel = (projectData) => {
  return {
    title: projectData.content?.title ?? "",
    contract: projectData.swap_contract ?? "",
  };
};

export { ProvideProject, useProject };
