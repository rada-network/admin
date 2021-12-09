import { createContext, useContext } from "react";

import ProjectModel from "@model/Project";

const projectsContext = createContext();

const ProvideProjects = ({ children, projects }) => {
  const projectsData = projects.map((project) => ProjectModel(project));

  return <projectsContext.Provider value={projectsData}>{children}</projectsContext.Provider>;
};

const useProjects = () => {
  return useContext(projectsContext);
};

export { ProvideProjects, useProjects };
