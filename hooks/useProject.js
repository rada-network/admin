import { createContext, useContext } from "react";
import { useAuth } from "./useAuth";
import { useContract, useContractCalls } from "./useContract";
import { formatEther } from "@ethersproject/units";

const projectContext = createContext();
const projectsContext = createContext();

const ProvideProject = ({ children, projectData }) => {
  const projectModel = ProjectModel(projectData);
  const account = useAuth();

  const contractChain = useContractCalls([
    { method: "admins", args: [account], contract: projectModel.contract },
    { method: "owner", args: [], contract: projectModel.contract },
    { method: "tokenAddress", args: [], contract: projectModel.contract },
    { method: "totalTokenDeposited", args: [], contract: projectModel.contract },
    { method: "isCommit", args: [], contract: projectModel.contract },
  ]);

  if (contractChain.length === 0) {
    return "Connecting....";
  }

  if (contractChain[0] && contractChain[0][0]) {
    projectModel.isAdmin = true;
  }

  if (contractChain[1] && contractChain[1][0] === account) {
    projectModel.isOwner = true;
  }

  if (
    contractChain[2] &&
    contractChain[2][0] &&
    contractChain[2][0] !== "0x0000000000000000000000000000000000000000"
  ) {
    projectModel.tokenAddress = contractChain[2][0];
  }

  if (contractChain[3] && contractChain[3][0]) {
    projectModel.totalTokenDeposited = formatEther(contractChain[3][0]);
  }

  if (contractChain[4] && contractChain[4][0]) {
    projectModel.isCommit = true;
  }

  console.log("ProvideProject", projectModel, contractChain);

  return <projectContext.Provider value={projectModel}>{children}</projectContext.Provider>;
};

const ProvideProjects = ({ children, projects }) => {
  return <projectsContext.Provider value={projects}>{children}</projectsContext.Provider>;
};

const useProject = () => {
  return useContext(projectContext);
};

const useProjects = () => {
  return useContext(projectsContext);
};

const ProjectModel = (projectData) => {
  console.log("ProjectModel", projectData);
  const contractInstance = useContract(projectData.swap_contract);

  return {
    title: projectData.content?.title ?? "",
    contract: projectData.swap_contract ?? "",
    isWhitelist: projectData.is_whitelist ?? false,
    contractInstance: contractInstance,
    tokenAddress: "",
    totalTokenDeposited: 0,
    isAdmin: false,
    isOwner: false,
    isCommit: false,
  };
};

export { ProvideProject, ProvideProjects, useProject, useProjects };
