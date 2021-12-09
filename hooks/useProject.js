import { createContext, useContext } from "react";
import { useAuth } from "./useAuth";
import { useContractCalls } from "./useContract";
import { formatEther, formatUnits } from "@ethersproject/units";

import ProjectModel from "@model/Project";

const projectContext = createContext();

const ProvideProject = ({ children, projectData }) => {
  const projectModel = ProjectModel(projectData);
  const auth = useAuth();

  let contractCalls = [
    { method: "admins", args: [auth.account], contract: projectModel.contract },
    { method: "owner", args: [], contract: projectModel.contract },
    { method: "tokenAddress", args: [], contract: projectModel.contract },
    { method: "totalTokenDeposited", args: [], contract: projectModel.contract },
    { method: "isCommit", args: [], contract: projectModel.contract },
    { method: "winCount", args: [], contract: projectModel.contract },
    { method: "getSubscribers", args: [], contract: projectModel.contract },
  ];

  if (projectModel.isWhitelist) {
    contractCalls.push({ method: "countWhitelist", args: [], contract: projectModel.contract });
  }

  const contractChain = useContractCalls(contractCalls);

  if (contractChain.length === 0) {
    return "Connecting....";
  }

  contractChain.forEach((chain, i) => {
    if (chain[0]) {
      switch (i) {
        case 0:
          projectModel.isAdmin = true;
          break;

        case 1:
          if (chain[0] === auth.account) {
            projectModel.isOwner = true;
          }

          break;

        case 2:
          if (chain[0] !== "0x0000000000000000000000000000000000000000") {
            projectModel.tokenAddress = chain[0];
          }
          break;

        case 3:
          projectModel.totalTokenDeposited = formatEther(chain[0]);
          break;

        case 4:
          projectModel.isCommit = true;
          break;

        case 5:
          projectModel.winners = formatUnits(chain[0], 0);
          break;

        case 6:
          projectModel.subscribers = chain[0].length;
          break;

        case 7:
          projectModel.whitelist = formatUnits(chain[0], 0);
          break;
        default:
          break;
      }
    }
  });

  if (!projectModel.isAdmin && !projectModel.isOwner) {
    return "Ops...";
  }

  console.log("ProvideProject", projectModel, contractChain);

  return <projectContext.Provider value={projectModel}>{children}</projectContext.Provider>;
};

const useProject = () => {
  return useContext(projectContext);
};

export { ProvideProject, useProject };
