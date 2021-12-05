import Title from "@components/Title";
import { useProject } from "@hooks/useProject";

const ProjectTitle = () => {
  const projectData = useProject();

  console.log("Project - ProjectTitle render", projectData);

  return (
    <>
      <Title>Project: {projectData.title}</Title>
      <p>Swap Contract: {projectData.contract}</p>
    </>
  );
};

export default ProjectTitle;
