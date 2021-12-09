import { useContract } from "@hooks/useContract";
import { formatDate } from "@utils/format";

const ProjectModel = (projectData) => {
  console.log("ProjectModel", projectData);
  const contractInstance = useContract(projectData.swap_contract);

  return {
    id: projectData.id ?? 0,
    title: projectData.content?.title ?? "",
    slug: projectData.slug ?? "",
    contract: projectData.swap_contract ?? "",
    isWhitelist: projectData.is_whitelist ?? false,
    contractInstance: contractInstance,
    tokenAddress: "",
    totalTokenDeposited: 0,
    openDate: formatDate(projectData.open_date),
    endDate: formatDate(projectData.end_date),
    type: projectData.type ?? "",
    status: projectData.status ?? "",
    whitelist: 0,
    winners: 0,
    subscribers: 0,
    isAdmin: false,
    isOwner: false,
    isCommit: false,
  };
};

export default ProjectModel;
